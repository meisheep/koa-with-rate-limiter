const Koa = require('koa');
const Router = require('koa-router');
const limiter = require('./middleware/rate-limiter');
const rateLogger = require('./middleware/rate-logger');

const RPM = process.env.RPM || 60;
const PORT = process.env.PORT || 3000;

const app = new Koa();
const router = new Router();

router.get('/', limiter(RPM), rateLogger(), async (ctx) => {
  ctx.body = ctx.state.hasResponse ? ctx.state.requestCounts : 'Error';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(PORT);

module.exports = server;
