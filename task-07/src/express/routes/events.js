const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const authCheck = require('../middlewares/auth-check-middleware');
const validationCheck = require('../middlewares/validation-check-middleware');

const di = require('../di');
const { EventController, EventValidator } = di.container;
const router = Router();

router.get('/', EventController.getEvents);

router.post(
  '/',
  authCheck,
  EventValidator.getCreateValidator(),
  validationCheck,
  EventController.createEvent
);

router.put(
  '/',
  authCheck,
  EventValidator.getUpdateValidator(),
  validationCheck,
  EventController.updateEvent
);

router.delete(
  '/',
  authCheck,
  EventValidator.getDeleteValidator(),
  validationCheck,
  EventController.deleteEvent
);

module.exports = router;
