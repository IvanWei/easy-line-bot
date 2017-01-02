const http = require('http');
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

global.config = require(`./env/${process.env.NODE_ENV || 'development'}`);
global.db = require('./db');

const app = new Koa();
const port = config.port;
const router = new Router();
const apiFolderPath = path.join(__dirname, '../api/controllers/');
const dbFolderPath = path.join(__dirname, '../api/models/');
const apiConfigs = fs.readdirSync(apiFolderPath);
const dbConfigs = fs.readdirSync(dbFolderPath);

apiConfigs.forEach((filename) => {
  require(`${apiFolderPath}${filename}`)(router);
});
dbConfigs.forEach((filename) => {
  db[path.basename(filename, '.js')] = require(`${dbFolderPath}${filename}`)(db.sequelize, db.Sequelize);
});
db.sequelize.sync({ force: config.db.force })
.then(() => {
  if (config.initData) {
    require('./initData');
  }
});

app
.use(bodyparser())
.use(router.routes()) // Assigns routes.
.use(router.allowedMethods());

if (config.logger) {
  const logger = require('koa-logger');

  app.use(logger());
}


http.createServer(app.callback())
.listen(port, () => {
  if (config.env !== 'production') {
    console.log(`App listening on port ${port} !`);
  }
});
