const router = require('koa-router')();

const authCheck = require('./auth-check-middleware');

const {
  createValidator,
  deleteValidator
} = require('../validators/booking.validation');

const {
  getBookingsController,
  bookEventController,
  cancelBookingController
} = require('../controllers/bookings.controller');

router.get('/', authCheck, getBookingsController);

router.post('/', authCheck, createValidator, bookEventController);

router.delete('/', authCheck, deleteValidator, cancelBookingController);

module.exports = router;
