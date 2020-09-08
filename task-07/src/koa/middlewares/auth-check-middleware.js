const jwt = require('jsonwebtoken');

const handleUnauthorized = function (ctx) {
  ctx.throw(401, 'Unauthorized');
};

module.exports = async (ctx, next) => {
  const authHeader = ctx.headers.authorization;

  if (!authHeader) {
    return handleUnauthorized(ctx);
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return handleUnauthorized(ctx);
  }

  if (!decodedToken) {
    return handleUnauthorized(ctx);
  }

  ctx.isAuth = true;
  ctx.userId = decodedToken.userId;

  await next();
};
