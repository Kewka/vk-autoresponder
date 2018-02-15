import mysql from 'mysql';
import config from './config';
import logger from '~/utils/logger'

export default class DB {
    static pool = null;

    static init(){
        this.pool = mysql.createPool(config);
    }

    static query(query, params){
        if (!this.pool) return logger.error('Пул подключений не создан. Используйте DB.init()');
        return new Promise((resolve, reject) => {
            this.pool.query(query, params, (err, results, fields) => err ? reject(err) : resolve({ results, fields }));
        });
    }
}