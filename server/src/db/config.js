export default process.env.NODE_ENV === 'development'
    ? {
        // development database
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'database',
        charset: 'utf8mb4'
    }
    : { // production database
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'database',
        charset: 'utf8mb4'
    }