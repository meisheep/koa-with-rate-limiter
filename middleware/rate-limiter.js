const RateLimiter = require('../lib/RateLimiter');

module.exports = (rpm) => {
  const limiter = new RateLimiter(rpm);
  return async function (ctx, next) {
    const ip = ctx.request.ip;

    ctx.state.requestCounts = limiter.incrementIPCounts(ip);
    ctx.state.hasResponse = limiter.shouldResponse(ip);

    await next();
  };
};
