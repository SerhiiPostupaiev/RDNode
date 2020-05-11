async function bookings(db) {
  return await db.Booking.scope('withModels').findAll();
}

async function bookEvent(eventId, userId, db) {
  try {
    const booking = await db.Booking.create({
      eventId,
      userId
    });

    return await db.Booking.scope('withModels').findByPk(booking.id);
  } catch (err) {
    throw new Error(err);
  }
}

async function cancelBooking(bookingId, db) {
  try {
    const booking = await db.Booking.scope('withModels').findByPk(bookingId);
    const event = booking.event;

    await booking.destroy();

    return event;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  bookings,
  bookEvent,
  cancelBooking
};
