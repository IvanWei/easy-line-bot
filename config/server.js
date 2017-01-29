const http = require('http');
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const config = require(`./env/${process.env.NODE_ENV || 'development'}`);
const app = new Koa();
const port = config.port;
const router = new Router();
const apiFolderPath = path.join(__dirname, '../api/controllers/');
const filenames = fs.readdirSync(apiFolderPath);

filenames.forEach((filename) => {
  require(`${apiFolderPath}${filename}`)(router);
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
