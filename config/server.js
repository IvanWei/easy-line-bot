'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const koa = require('koa');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const koaRouter = require('koa-router');

const app = new koa();

const routing = require('../api/controllers/webhooks').routing;
const router = routing(koaRouter());

if (app.env === 'test') {
  let errorInfo = new Error('NODE_ENV doesn\'t use test mode.');
  console.error(errorInfo)
  process.exit();
}

app
  .use(logger())
  .use(bodyparser())
  .use(async (ctx, next) => {
    try {
      await next();

    } catch (err) {
      ctx.body = err.message;
      ctx.status = 500;

    }
  })
  .use(router.routes()) // Assigns routes.
  .use(router.allowedMethods());


http.createServer(app.callback())
.listen(PORT, () => {
  console.log('App listening on port ' + PORT + '!'); // Server 啟動後吐回目前的 PORT 碼
});
