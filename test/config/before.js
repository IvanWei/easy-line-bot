'use strict'

const http = require('http');
const PORT = process.env.PORT || 8080;

const crypto = require('crypto');

const secret = 'abcdefg';

const koa = require('koa');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const koaRouter = require('koa-router');

global.app = new koa();

global.request = require('supertest').agent(app.listen());

const routing = require('../../api/controllers/webhooks').routing;
const router = routing(koaRouter());

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
