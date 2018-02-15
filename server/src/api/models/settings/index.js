import DB from '~/db'
import OnlineService from '~/services/online'
import logger from '~/utils/logger'

export default class Settings {
    static async get(req, res){
        const { access_token } = req.props;
        const query = "SELECT online_mode, active_chats FROM settings WHERE user_id = (SELECT user_id FROM tokens WHERE access_token = ?)";
        const { results } = await DB.query(query, [access_token]);
        if (results.length) res.json(results[0]);
        else res.json({ error: 'invalid_token', error_code: 5 });
    }

    static async update(req, res){
        try {
            const { access_token } = req.props;
            const params = {
                online_mode: !!+req.props.online_mode,
                active_chats: !!+req.props.active_chats
            };
            const query = "UPDATE settings SET last_update = UNIX_TIMESTAMP(), ? WHERE user_id = (SELECT user_id FROM tokens WHERE access_token = ?)";
            await DB.query(query, [params, access_token]);
            params.online_mode ? await OnlineService.setOnline([ access_token ]) : await OnlineService.setOffline([ access_token ]);
            res.json({ response: 1 });
        } catch (e){
            logger.error(e);
            res.sendStatus(500);
        }
    }
}