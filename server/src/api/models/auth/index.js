import DB from '~/db'
import VK from '~/vk'

export default class Auth {
    static async login(req, res){
        if (Object.keys(req.props).length){
            const { code, username, password } = req.props;
            const response = code && !username && !password ? await VK.authByCode({ code }) : await VK.authDirect(req.props);
            if (!response.access_token) return res.json(response);
            await Auth._addUser(response.user_id);
            await Auth._updateSettings(response.user_id);
            await Auth._addToken(response);
            res.json({ access_token: response.access_token });
        } else res.json({ error: 'invalid_params', error_msg: 'Не указаны параметры для авторизации' })
    }

    static async _addUser(user_id){
        const query = "INSERT IGNORE INTO users (user_id, reg_time) VALUES (?, UNIX_TIMESTAMP())";
        await DB.query(query, [user_id]);
    }

    static async _addToken({ access_token, user_id }){
        const query = "INSERT INTO tokens (user_id, access_token, time) VALUES (?, UNIX_TIMESTAMP())";
        await DB.query(query, [[user_id, access_token]]);
    }

    static async _updateSettings(user_id){
        const query = "INSERT IGNORE INTO settings (user_id, last_update) VALUES (?, UNIX_TIMESTAMP())";
        await DB.query(query, [user_id]);
    }
}