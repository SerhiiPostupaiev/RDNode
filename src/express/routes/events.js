const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const authCheck = require('./auth-check-middleware');
const {
  getEventsController,
  createEventController
} = require('../controllers/events.controller');

const router = Router();

router.get('/', getEventsController);

router.post(
  '/',
  authCheck,
  [
    check('title').isLength({ min: 5 }),
    check('description').isLength({ min: 5 }),
    check('date').isLength({ min: 5 }),
    check('price').isNumeric(),
  ],
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    next();
  },
  createEventController
);

module.exports = router;
