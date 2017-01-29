const LineBot = require('../services/LineBot');

module.exports = (router) => {
  router
  .post('/webhooks', async (ctx, next) => {
    const koaRequest = ctx.request;
    const auth = await LineBot.authentication(koaRequest);

    if (auth.isValid) {
      ctx.status = 200;

      const requestEvents = koaRequest.body.events;

      try {
        LineBot.reply(auth, requestEvents);
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
};
