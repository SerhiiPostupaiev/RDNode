const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const authCheck = require('./auth-check-middleware');

const {
  getBookingsController,
  bookEventController,
  cancelBookingController
} = require('../controllers/bookings.controller');

const router = Router();

router.get('/', authCheck, getBookingsController);

router.post(
  '/',
  authCheck,
  [
    check('eventId').isLength({ min: 5 }),
  ],
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    next();
  },
  bookEventController
);

router.delete(
  '/',
  authCheck,
  [
    check('bookingId').isLength({ min: 5 }),
  ],
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    next();
  },
  cancelBookingController
);

module.exports = router;
