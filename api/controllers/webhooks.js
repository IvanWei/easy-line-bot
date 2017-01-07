const LineBot = require('../services/LineBot');

exports.routing = (router) => {
  router
  .get('/', async (ctx) => {
    ctx.body = 'It works.';
  })
  .post('/webhooks', async (ctx, next) => {
    const koaRequest = ctx.request;
    const auth = LineBot.authentication(koaRequest);

    if (auth.isValid) {
      ctx.status = 200;

      const requestEvents = koaRequest.body.events;

      try {
        await LineBot.reply(auth, requestEvents);
        await next();
      } catch (e) {
        ctx.body = e.message;
        ctx.status = e.status;
      }
    } else {
      ctx.body = 'Unauthorized! Channel Serect and Request header aren\'t the same.';
      ctx.status = 401;
    }
  });

  return router;
};
