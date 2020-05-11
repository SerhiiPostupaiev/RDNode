const {
  bookings,
  bookEvent,
  cancelBooking
} = require('../services/bookings.service');

async function getBookingsController(req, res) {
  try {
    const result = await bookings(req.dbContext);

    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function bookEventController(req, res) {
  try {
    const result = await bookEvent(req.body.eventId, req.userId, req.dbContext);

    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function cancelBookingController(req, res) {
  try {
    const result = await cancelBooking(req.body.bookingId, req.dbContext);

    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
  getBookingsController,
  bookEventController,
  cancelBookingController
}
