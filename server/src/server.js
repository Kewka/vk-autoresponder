import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import logger from './utils/logger'
import DB from './db'
import apiRouter from './api/router'
import clientRouter from './clientRouter'
import OnlineService from './services/online'
import RespondersService from './services/responders'

const app = express();
const port = process.argv[2] || 80;

app.listen(port, () => logger.info(`Listen ${port} port`));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: 1 }));
process.env.NODE_ENV === 'development' && app.use((req, res, next) => res.header('Access-Control-Allow-Origin', '*') && next());

DB.init();
OnlineService.init();
RespondersService.init();

apiRouter(app);
clientRouter(app);