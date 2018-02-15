import DB from '~/db';

export default class History {
    static async get(req, res){
        const { access_token } = req.props;
        const query = "SELECT * FROM history WHERE user_id = (SELECT user_id FROM tokens WHERE access_token = ?) ORDER BY time DESC LIMIT 100";
        const { results } = await DB.query(query, [access_token]);
        res.json(results);
    }

    static async clear(req, res){
        const { access_token } = req.props;
        const query = "DELETE FROM history WHERE user_id = (SELECT user_id FROM tokens WHERE access_token = ?)";
        await DB.query(query, [access_token]);
        res.json({ response: 1 });
    }
}