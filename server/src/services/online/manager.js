import DB from '~/db'
import VK from '~/vk'
import logger from '~/utils/logger'
import { CronJob } from 'cron'

export default class OnlineManager {
    static cronTime = '*/4 * * * *'; // интервал обновления онлайна

    /**
     * Инициализирует Online Manager.
     * @returns {Promise.<void>}
     */
    static async init(){
        logger.info('OnlineManager | created');
        await this.updateOnline();
        new CronJob(this.cronTime, () => this.updateOnline(), () => logger.warn('OnlineManager | stopped.'), true);
        logger.info('OnlineManager | CronJob created.');
    }

    /**
     * Меняет статус на "Online" у пользователей, включивших вечный онлайн.
     * @returns {Promise.<void>}
     */
    static async updateOnline(){
        const tokens = await this.getTokens();
        await this.setOnline(tokens);
    }

    /**
     * Ставит статус "Online" для токенов.
     * @param tokens Массив с токенами.
     * @returns {Promise.<void>}
     */
    static async setOnline(tokens){
        logger.info(`OnlineManager | set online tokens (${tokens.length}):`, tokens);
        for (let access_token of tokens)
            await VK.callMethod('account.setOnline', { access_token });
    }

    /**
     * Ставит статус "Offline" для токенов.
     * @param tokens Массив с токенами.
     * @returns {Promise.<void>}
     */
    static async setOffline(tokens){
        logger.info(`OnlineManager | set offline tokens (${tokens.length}):`, tokens);
        for (let access_token of tokens) await VK.callMethod('account.setOffline', { access_token });
    }

    /**
     * Возвращает массив с токенами пользователей, которые включили вечный онлайн.
     * @returns {Promise.<*>}
     */
    static async getTokens(){
        const query = "SELECT (SELECT access_token FROM tokens WHERE user_id = settings.user_id ORDER BY time DESC LIMIT 1) as access_token FROM settings WHERE online_mode = 1";
        try {
            const { results } = await DB.query(query);
            return results.map(item => item.access_token);
        } catch (e){
            logger.error(e);
            logger.error('OnlineManager | Не удалось загрузить токены');
            return [];
        }
    }
}