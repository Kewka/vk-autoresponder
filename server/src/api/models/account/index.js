import DB from '~/db';
import VK from '~/vk';

export default class Account {
    static async get(req, res){
        const { access_token } = req.props;
        const query = "SELECT user_id FROM tokens WHERE access_token = ?";
        const { results } = await DB.query(query, [access_token]);
        if (results.length){
            const fields = "online,photo_max,status,counters,last_seen,sex";
            const { response, error } = await VK.callMethod('users.get', { access_token, fields });
            if (error) res.json(error);
            else if (response && response.length) res.json(response[0]);
            else res.json({});
        } else res.json({ error_code: 5 });
    }
}