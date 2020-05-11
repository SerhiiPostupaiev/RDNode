const {
  events,
  createEvent
} = require('../services/event.service');

async function getEventsController(req, res) {
  try {
    const result = await events(req.dbContext);

    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function createEventController(req, res) {
  try {
    const result = await createEvent(req.body, req.userId, req.dbContext);

    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}


module.exports = {
  getEventsController,
  createEventController
}
