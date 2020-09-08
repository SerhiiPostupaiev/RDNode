const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const validationCheck = require('../middlewares/validation-check-middleware');

const di = require('../di');
const { AuthController, UserValidator } = di.container;
const router = Router();

router.post(
  '/login',
  UserValidator.getCreateValidator(),
  validationCheck,
  AuthController.login
);

router.post(
  '/signup',
  UserValidator.getCreateValidator(),
  validationCheck,
  AuthController.signup
);

module.exports = router;
