const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const authCheck = require('../middlewares/auth-check-middleware');
const validationCheck = require('../middlewares/validation-check-middleware');

const di = require('../di');

const { BookingController, BookingValidator } = di.container;

const router = Router();

router.get('/', authCheck, BookingController.getBookings);

router.post(
  '/',
  authCheck,
  BookingValidator.getCreateValidator(),
  validationCheck,
  BookingController.bookEvent
);

router.delete(
  '/',
  authCheck,
  BookingValidator.getDeleteValidator(),
  validationCheck,
  BookingController.cancelBooking
);

module.exports = router;
