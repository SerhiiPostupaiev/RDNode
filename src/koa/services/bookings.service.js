async function bookings(db) {
  const data = await db.Booking.scope('withModels').findAll();
  return data;
}

async function bookEvent(eventId, userId, db) {
  const booking = await db.Booking.create({
    eventId,
    userId
  });

  return await db.Booking.scope('withModels').findByPk(booking.id);
}

async function cancelBooking(bookingId, db) {
  const booking = await db.Booking.scope('withModels').findByPk(bookingId);
  const event = booking.event;

  await booking.destroy();

  return event;
}

module.exports = {
  bookings,
  bookEvent,
  cancelBooking
};
