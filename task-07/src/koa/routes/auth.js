const router = require('koa-router')();

const di = require('../di');

const { AuthController, UserValidator } = di.container;

router.post('/login', UserValidator.createValidator, AuthController.login);

router.post('/signup', UserValidator.createValidator, AuthController.signup);

module.exports = router;
