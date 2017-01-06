'use strict'

const http = require('http');
const PORT = process.env.PORT || Math.floor(Math.random() * (55536) + 10000);

const crypto = require('crypto');

const koa = require('koa');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const koaRouter = require('koa-router');
const routing = require('../../api/controllers/webhooks').routing;
const router = routing(koaRouter());

global.app = new koa();
global.request = require('supertest').agent(app.listen());

before((done) => {
  if (app.env !== 'test') {
    const errorInfo = new Error('NODE_ENV need to use test mode.');
    return done(errorInfo);
  }

  app
    .use(logger())
    .use(bodyparser())
    .use(router.routes()) // Assigns routes.
    .use(router.allowedMethods());

  http.createServer(app.callback())
  .listen(PORT, () => {
    console.log('App listening on port ' + PORT + '!'); // Server 啟動後吐回目前的 PORT 碼
    return done();
  });
});
