const {
  bookings,
  bookEvent,
  cancelBooking
} = require('../services/bookings.service');

async function getBookingsController(ctx, next) {
  ctx.body = await bookings(ctx.dbContext);
}

async function bookEventController(ctx, next) {
  ctx.body = await bookEvent(ctx.request.body.eventId, ctx.userId, ctx.dbContext);
}

async function cancelBookingController(ctx, next) {
  ctx.body = await cancelBooking(ctx.request.body.bookingId, ctx.dbContext);
}

module.exports = {
  getBookingsController,
  bookEventController,
  cancelBookingController
}
