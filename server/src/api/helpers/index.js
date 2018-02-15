import DB from '~/db'

export default class Helpers{
    /**
     * Возвращает пользователя из базы по access_token.
     * @param access_token Токен пользователя.
     * @returns {Promise.<null>}
     */
    static async getUser(access_token){
        const query = "SELECT * FROM users WHERE user_id = (SELECT user_id FROM tokens WHERE access_token = ?)";
        const { results } = await DB.query(query, [access_token]);
        return results.length > 0 ? results[0] : null;
    }
}