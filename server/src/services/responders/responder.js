import axios from 'axios'
import VK from '~/vk';
import logger from "~/utils/logger"
import DB from '~/db'
import RespondersService from '~/services/responders'

export default class Responder{
    user_id = null;
    access_token = null;
    longpoll = null;
    settings = null;
    online = null;
    activated = false;

    /**
     * Создает новый объект Responder и запускает прослушку сообщений.
     * @param user_id ID пользователя.
     * @param access_token Токен доступа.
     * @constructor
     */
    constructor(user_id, access_token){
        this.user_id = user_id;
        this.access_token = access_token;
        logger.info('Created responder', this.user_id, this.access_token);
        this.setActivated(true);
        this.listen()
    }

    /**
     * Обрабатывает полученное сообщение.
     * @param m Событие, полученное от Long Poll сервера (code: 4).
     * @returns {Promise.<void>}
     */
    async onMessage(m){
        const message = {
            peer_id: m[3],
            isChat: m[3] > 2e9,
            isOutcoming: !!(m[2] & 2),
            time: m[4],
            isGroup: m[3] < 0,
            body: m[5],
            hasAttachments: !!(m[6].attach1 || m[6].fwd || m[6].geo)
        };
        if (message.isOutcoming) return;
        const settingsUpdated = await this.updateSettings();
        if (settingsUpdated){
            const { active_chats } = this.settings;
            if (!active_chats && message.isChat) return;
            const answer = await this.getAnswer(message.body);
            if (!answer) return;
            await this.sendAnswer(message, answer);
            await this.addToHistory(message, answer);
        } else await this.disable();
    }

    /**
     * Отправляет ответ.
     * @param message Объект сообщения.
     * @param answer Текст ответа.
     * @returns {Promise.<void>}
     */
    async sendAnswer(message, answer){
        await VK.callMethod('messages.send', { message: answer, peer_id: message.peer_id, access_token: this.access_token });
        if (!this.settings.online_mode) await VK.callMethod('account.setOffline', { access_token: this.access_token });
    }

    /**
     * Возвращает текст ответа, соответствующего тексту сообщения.
     * @param body Текст сообщения.
     * @returns {Promise.<string | null>}
     */
    async getAnswer(body){
        if (!await this.updateOnline()) return null;
        const query = "SELECT pattern, answer, in_online FROM answers WHERE user_id = ?";
        const { results } = await DB.query(query, [this.user_id]);
        const items = results.filter(item => item.in_online === this.online);
        const answers = [ ...items.filter(item => item.pattern !== '.*'), ...items.filter(item => item.pattern === '.*')];
        for (let item of answers){
            try {
                if (!new RegExp(item.pattern, 'i').test(body)) continue;
                const variants = answers.filter(i => i.pattern === item.pattern);
                return variants[Math.floor(Math.random() * variants.length)].answer; // return random answer
            } catch (e){
                logger.error(e);
            }
        }
        return null;
    }

    /**
     * Возвращает информацию о диалоге, используя peer_id.
     * @param peer_id
     * @returns {Promise} Содержит объект с полями { title: string, photo_max: string, href: string }
     */
    async getInfoByPeerId(peer_id){
        if (peer_id > 2e9){
            const { response } = await VK.callMethod('messages.getChat', { chat_id: peer_id - 2e9, fields: 'photo_max', access_token: this.access_token });
            if (response){
                return {
                    title: response.title,
                    photo_max: response.photo_200 || response.photo_100 || response.photo_50 || null,
                    href: null
                };
            }
        } else if (peer_id < 0){
            const { response } = await VK.callMethod('groups.getById', { group_id: -peer_id, access_token: this.access_token });
            if (response.length){
                const group = response[0];
                return {
                    title: group.name,
                    photo_max: group.photo_200 || group.photo_100 || group.photo_50 || null,
                    href: `https://vk.com/club${group.id}`
                }
            }
        } else if (peer_id > 0) {
            const { response } = await VK.callMethod('users.get', { fields: 'photo_max', user_id: peer_id, access_token: this.access_token });
            if (response.length){
                const user = response[0];
                return {
                    title: `${user.first_name} ${user.last_name}`,
                    photo_max: user.photo_max || null,
                    href: `https://vk.com/id${user.id}`
                }
            }
        }
        return null;
    }

    /**
     * Добавляет информацию об ответе в историю.
     * @param message Объект сообщения.
     * @param answer Текст ответа.
     * @returns {Promise.<void>}
     */
    async addToHistory(message, answer){
        // TODO: добавляет сообщение и ответ в историю
        let { peer_id, body, time, hasAttachments } = message;
        const dialog = await this.getInfoByPeerId(peer_id);
        if (!dialog) return logger.error('Не удалось получить информацию о сообщении: ', message);
        body += hasAttachments ? '[вложения]' : '';
        const { title, photo_max, href } = dialog;
        const query = "INSERT INTO history (user_id, peer_id, body, answer, title, photo_max, href, time) VALUES (?)";
        await DB.query(query, [[ this.user_id, peer_id, body, answer, title, photo_max, href, time ]]);
    }

    /**
     * Обновляет настройки автоответчика.
     * @returns {Promise.<boolean>}
     */
    async updateSettings(){
        const query = "SELECT active_chats, online_mode FROM settings WHERE user_id = ?";
        const { results } = await DB.query(query, [ this.user_id ]);
        if (!results.length) return false;
        this.settings = results[0];
        return true;
    }

    /**
     * Обновляет информацию об онлайне пользователя.
     * @returns {Promise.<boolean>}
     */
    async updateOnline(){
        const { response, error } = await VK.callMethod('users.get', { fields: 'online', access_token: this.access_token });
        if (response) {
            this.online = response[0].online;
            return true;
        } else if (error && error.code === 6) return true; // слишком много запросов (сохранить предыдущий онлайн)
        logger.error(`[${this.user_id}]: updateOnline failed`);
        return false;
    }

    /**
     * Обрабатывает ответ от Long Poll сервера.
     * @param response Ответ от Long Poll сервера.
     * @returns {Promise}
     */
    async onResponse(response){
        logger.debug(`[${this.user_id}]:`, response);
        if (response && response.ts !== undefined){
            await this.updateLongPoll(response.ts);
            const newMessages = response.updates.filter(item => item[0] === 4);
            for (let m of newMessages) await this.onMessage(m);
            return this.listen();
        }
        this.longpoll = null;
        return this.listen();
    }

    /**
     * Возвращает ответ от Long Poll сервера.
     * @returns {Promise.<void>}
     */
    async connect(){
        const { server, key, ts } = this.longpoll;
        logger.debug(`[${this.user_id}]: connecting... (ts: ${ts})`);
        const { data } = await axios.get(`https://${server}?act=a_check&key=${key}&ts=${ts}&wait=25&mode=2&version=2`);
        return data;
    }

    /**
     * Начинает циклическую прослушку событий пользователя.
     * @returns {Promise}
     */
    async listen(){
        try {
            if (!this.longpoll) await this.updateLongPoll();
            if (!this.activated) return;
            return this.onResponse(await this.connect());
        } catch (e){
            logger.error(e);
            return this.onResponse(null);
        }
    }

    setActivated(activated){
        this.activated = activated;
    }

    /**
     * Прекращает работу автоответчика. (токен пользователя не действителен)
     * @returns {Promise.<void>}
     */
    async disable() {
        this.setActivated(false);
        await DB.query("UPDATE users SET enabled = 0 WHERE user_id = ?", [this.user_id]);
        await DB.query("DELETE FROM tokens WHERE user_id = ?", [this.user_id]); // remove all tokens
        await RespondersService.removeResponder(this.user_id);
    }

    /**
     * Обновляет информацию для подключения к Long Poll серверу.
     * @param [ts] Номер последнего события (необязательный параметр)
     * @returns {Promise.<void>}
     */
    async updateLongPoll(ts = null){
        if (ts) this.longpoll.ts = ts;
        else {
            const { response, error } = await VK.callMethod('messages.getLongPollServer', { access_token: this.access_token, lp_version: 2 });
            if (response) this.longpoll = response;
            if (error) {
                logger.error(`[${this.user_id}]:`, error);
                await this.disable();
            }
        }
    }
}