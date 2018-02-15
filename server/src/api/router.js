import RateLimit from 'express-rate-limit'
import CallMethod from './models/callMethod'
import Auth from './models/auth'
import Account from './models/account'
import History from './models/history'
import Answers from './models/answers'
import Responders from './models/responders'
import Settings from './models/settings'
import VK from '~/vk'
import appConfig from '~/vk/appConfig.json'


const apiMiddleware = () => (req, res, next) => {
    req.props = { ...req.params, ...req.body, ...req.query };
    if (!req.path.slice(1)) res.json({ error: 'method_not_found', error_msg: 'Укажите имя метода (Например: api/account.get)' });
    else next();
};

// Устанавливаем лимит для запросов к API
const apiLimiter = () => new RateLimit({
    windowMs: 30 * 1000,
    max: 45,
    delayMs: 0,
    handler: (req, res, next) => res.json({ error: 'requests_limit', error_msg: 'Too many requests, please try again later' })
});

export default (app) => {
    /** Checking **/
    app.use('/api', apiLimiter(), apiMiddleware());

    /** Additionally **/
    app.all('/api/callMethod', CallMethod.fetch);

    /** Models **/

    // Auth
    app.all('/api/auth.login', Auth.login);
    app.get('/oauth', (req, res) => res.redirect(`https://oauth.vk.com/authorize?client_id=${appConfig.client_id}&display=page&scope=messages,offline&response_type=code&v=${VK.config.v}`));
    // Account
    app.all('/api/account.get', Account.get);

    // History
    app.all('/api/history.get', History.get);
    app.all('/api/history.clear', History.clear);

    // Answers
    app.all('/api/answers.get', Answers.get);
    app.all('/api/answers.add', Answers.add);
    app.all('/api/answers.remove', Answers.remove);

    // Responders
    app.all('/api/responders.getActive', Responders.getActive);
    app.all('/api/responders.getEnabled', Responders.getEnabled);
    app.all('/api/responders.setEnabled', Responders.setEnabled);

    // Settings
    app.all('/api/settings.get', Settings.get);
    app.all('/api/settings.update', Settings.update);
}