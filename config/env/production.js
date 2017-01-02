module.exports = {
  env: 'production',
  port: process.env.PORT || 3000,
  db: {
    username: process.env.MYSQL_ENV_MYSQL_USER_NAME || '',
    password: process.env.MYSQL_ENV_MYSQL_USER_PASS || '',
    host: process.env.MYSQL_PORT_3306_TCP_ADDR || '127.0.0.1',
    port: process.env.MYSQL_PORT_3306_TCP_PORT || 3306,
    database: process.env.MYSQL_ENV_MYSQL_USER_DB || 'fruit-tart',
    dialect: 'mysql',
    timezone: '+08:00',
    force: false,
  },
};
