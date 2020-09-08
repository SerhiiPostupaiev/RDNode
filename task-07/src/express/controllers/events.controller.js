class EventController {
  constructor(entityService) {
    this.entityService = entityService;
  }

  getEvents = async (req, res) => {
    try {
      const result = await this.entityService.events(req.dbContext);

      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  createEvent = async (req, res) => {
    try {
      const result = await this.entityService.createEvent(
        req.body,
        req.userId,
        req.dbContext
      );

      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  updateEvent = async (req, res) => {
    try {
      const result = await this.entityService.updateEvent(
        req.body,
        req.userId,
        req.dbContext
      );

      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  deleteEvent = async (req, res) => {
    try {
      const result = await this.entityService.deleteEvent(req.body);

      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
}

module.exports = EventController;
