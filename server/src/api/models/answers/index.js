import DB from '~/db';
import Helpers from '~/api/helpers'

export default class Answers {
    static maxCount = 100;

    static async get(req, res){
        const { access_token } = req.props;
        const query = "SELECT id, pattern, answer, in_online, time FROM answers WHERE user_id = (SELECT user_id FROM tokens WHERE access_token = ?) ORDER BY time DESC";
        const { results } = await DB.query(query, [access_token]);
        res.json(results);
    }

    static async remove(req, res){
        const { access_token, id } = req.props;
        const query = "DELETE FROM answers WHERE (SELECT user_id FROM tokens WHERE access_token = ?) AND id = ?";
        await DB.query(query, [access_token, id]);
        res.json({ response: 1 });
    }

    static async add(req, res){
        try {
            let { access_token, pattern, answer, in_online } = req.props;
            pattern = pattern.trim();
            answer = answer.trim();
            in_online = !!+in_online;
            if (!await Helpers.getUser(access_token))
                return res.json({ error: 'invalid_token', error_code: 5 });

            if (await Answers._getCount(access_token) >= Answers.maxCount)
                return res.json({ error: 'limit_answers', error_msg: 'Вы превысили лимит ответов' });

            if (!pattern || !answer || !pattern.length || !answer.length)
                return res.json({ error: 'invalid_answer', error_msg: 'Недопустимые значения для добавления ответа' });

            if (pattern.length > 512 || answer.length > 4096)
                return res.json({ error: 'invalid_answer', error_msg: 'Слишком длинный шаблон или ответ' });

            try { new RegExp(pattern, 'i') }
            catch (e) { return res.json({ error: 'invalid_pattern', error_msg: 'Некорректный шаблон' }) }

            const query = "INSERT INTO answers (user_id, pattern, answer, in_online, time) VALUES ((SELECT user_id FROM tokens WHERE access_token = ?), ?, UNIX_TIMESTAMP())";
            const { results } = await DB.query(query, [access_token, [pattern, answer, in_online]]);
            res.json({ id: results.insertId, time: Math.round(Date.now()/1000) });
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }

    static async  _getCount(access_token){
        const query = "SELECT COUNT(*) FROM answers WHERE user_id = (SELECT user_id FROM tokens WHERE access_token = ?)";
        const { results } = await DB.query(query, [access_token]);
        return results[0]['COUNT(*)'];
    }
}