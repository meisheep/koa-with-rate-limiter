module.exports = () => {
  return async function (ctx, next) {
    const { requestCounts, hasResponse } = ctx.state;
    if (requestCounts !== undefined && hasResponse !== undefined){
      console.log(`Request(${requestCounts}) from ${ctx.request.ip} ${hasResponse ? 'Allowed' : 'Denied'} (${(new Date()).toGMTString()})`);
    }
    await next();
  };
};
