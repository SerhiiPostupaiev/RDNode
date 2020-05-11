const router = require('koa-router')();

const userValidator = require('../validators/user.validation');

const {
  loginController,
  signupController
} = require('../controllers/auth.controller');

router.post('/login', userValidator, loginController);

router.post('/signup', userValidator, signupController);

module.exports = router;
