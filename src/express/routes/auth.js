const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const {
  loginController,
  signupController
} = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/login',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
  ],
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    next();
  },
  loginController
);

router.post(
  '/signup',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
  ],
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    next();
  },
  signupController
);

module.exports = router;
