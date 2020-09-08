const router = require('koa-router')();

const authCheck = require('../middlewares/auth-check-middleware');

const di = require('../di');

const { EventController, EventValidator } = di.container;

router.post(
  '/',
  authCheck,
  EventValidator.createValidator,
  EventController.createEvent
);

router.put(
  '/',
  authCheck,
  EventValidator.updateValidator,
  EventController.updateEvent
);

router.get('/', EventController.getEvents);

router.delete(
  '/',
  authCheck,
  EventValidator.deleteValidator,
  EventController.deleteEvent
);

module.exports = router;
