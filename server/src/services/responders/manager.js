import DB from '~/db'
import logger from '~/utils/logger'
import Responder from './responder'

export default class RespondersManager {
    static items = [];

    /**
     * Инициализирует Responders Manager.
     */
    static init() {
        logger.info('RespondersManager | created');
        this.setInitialItems();
        setInterval(() => this.printItems(), 15000);
    }

    /**
     * Добавляет автоответчики из базы данных.
     * @returns {Promise.<void>}
     */
    static async setInitialItems() {
        const { results } = await DB.query("SELECT user_id, (SELECT access_token FROM tokens WHERE user_id = users.user_id ORDER BY time DESC LIMIT 1) AS access_token FROM users WHERE enabled = 1")
        for (let item of results) this.addResponder(item)
        this.printItems();
    }

    /**
     * Выводит информацию о активных автоответчиках.
     */
    static printItems(){
        logger.info(`RespondersManager | responders (${this.items.length}):`,
                    this.items.map(item => ({ user_id: item.user_id })));
    }

    /**
     * Удаляет автоответчик.
     * @param user_id ID пользователя.
     */
    static removeResponder(user_id){
        const responder = this.items.find(item => item.user_id === user_id);
        if (!responder) return;
        responder.setActivated(false);
        logger.debug('Remove Responder', user_id);
        this.items = this.items.filter(item => item.user_id !== responder.user_id);
    }

    /**
     * Добавляет новый автоответчик.
     * @param  {object} config Объект с полями { user_id: number, access_token: string }
     */
    static addResponder({ user_id, access_token }){
        if (this.items.find(item => item.user_id === user_id)) return;
        this.items.push(new Responder(user_id, access_token));
    }
}