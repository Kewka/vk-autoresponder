import { getLogger, configure } from 'log4js'
configure({
    appenders: {
        out: {type: 'console'},
        app: {type: 'file', filename: 'logs/server.log'}
    },
    categories: {
        default: { appenders: ['app', 'out'], level: 'debug' }
    }
});
export default getLogger();