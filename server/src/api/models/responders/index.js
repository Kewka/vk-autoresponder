import DB from '~/db';
import VK from '~/vk';
import Helpers from '~/api/helpers'
import RespondersService from '~/services/responders'

export default class Responders {

    static async getEnabled(req, res){
        const { access_token } = req.props;
        const query = "SELECT enabled FROM users WHERE user_id = (SELECT user_id FROM tokens WHERE access_token = ?)";
        const { results } = await DB.query(query, [access_token]);
        if (results.length) res.json(results[0]);
        else res.json({ error: 'invalid_token', error_code: 5 });
    }

    static async getActive(req, res){
        const query = "SELECT user_id FROM users WHERE enabled = 1";
        const { results } = await DB.query(query);
        const user_ids = results.map(item => item.user_id);
        if (user_ids.length) {
            const { response, error } = await VK.callMethod('users.get', { user_ids, fields: 'photo_max' });
            res.json(response || error || []);
        } else res.json([]);
    }

    static async setEnabled(req, res){
        let { access_token, enabled } = req.props;
        enabled = +!!+enabled;
        const query = "UPDATE users SET enabled = ? WHERE user_id = (SELECT user_id FROM tokens WHERE access_token = ?)";
        await DB.query(query, [enabled, access_token]);
        const user = await Helpers.getUser(access_token);
        if (user){
            if (enabled) await RespondersService.addResponder({ access_token: access_token, user_id: user.user_id });
            else await RespondersService.removeResponder(user.user_id);
            res.json({ enabled });
        } else res.json({ error_code: 5 })
    }
}