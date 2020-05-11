const {
  login,
  signup
} = require('../services/auth.service');

async function loginController(ctx, next) {
  ctx.body = await login(ctx.request.body.email, ctx.request.body.password, ctx.dbContext);
}

async function signupController(ctx, next) {
  ctx.body = await signup(ctx.request.body.email, ctx.request.body.password, ctx.dbContext);
}

module.exports = {
  loginController,
  signupController,
}
