const Sequelize = require('sequelize');

const db = {};
const dbConfig = config.db;
const options = {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  timezone: dbConfig.timezone,
};

db.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, options);
db.Sequelize = Sequelize;

module.exports = db;
