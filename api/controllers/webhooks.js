const lineBot = require('../services/lineBot');

exports.routing = (router) => {

  router
  .get('/', async (ctx, next) => {
    ctx.body = `It works.`;
    // ctx.redirect('https://blog.ivanwei.co');
  })
  .post('/webhooks', async (ctx, next) => {
    const koaRequest = ctx.request;
    const auth = lineBot.authentication(koaRequest);

    if (auth.isValid) {
      const requestEvents = koaRequest.body.events;

      ctx.status = 200;

      try {
        await lineBot.reply(auth, requestEvents);
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
}
