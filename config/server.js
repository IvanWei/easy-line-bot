const http = require('http');
const Koa = require('koa');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const koaRouter = require('koa-router');
const routing = require('../api/controllers/webhooks').routing;

const PORT = process.env.PORT || 3000;
const app = new Koa();
const router = routing(koaRouter());

if (app.env === 'test') {
  const errorInfo = new Error('NODE_ENV doesn\'t use test mode.');
  console.error(errorInfo);
  process.exit();
}

app
  .use(logger())
  .use(bodyparser())
  .use(router.routes()) // Assigns routes.
  .use(router.allowedMethods());


http.createServer(app.callback())
.listen(PORT, () => {
  console.log(`App listening on port ${PORT} !`);
});
