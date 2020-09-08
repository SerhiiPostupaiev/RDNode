class BookingController {
  constructor(entityService) {
    this.entityService = entityService;
  }

  getBookings = async (req, res) => {
    try {
      const result = await this.entityService.bookings(req.dbContext);

      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  bookEvent = async (req, res) => {
    try {
      const result = await this.entityService.bookEvent(
        req.body.eventId,
        req.userId,
        req.dbContext
      );

      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  cancelBooking = async (req, res) => {
    try {
      const result = await this.entityService.cancelBooking(
        req.body.bookingId,
        req.dbContext
      );

      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
}

module.exports = BookingController;
