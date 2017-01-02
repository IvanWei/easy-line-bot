module.exports = (router) => {
  router
  .get('/', async (ctx, next) => {
    ctx.body = 'It works.';
  });
};
