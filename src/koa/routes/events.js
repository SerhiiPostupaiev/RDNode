const router = require('koa-router')();

const authCheck = require('./auth-check-middleware');

const {
  createEventController,
  eventsController
} = require('../controllers/events.controller');

const {
  createValidator
} = require('../validators/event.validation');

router.post('/', authCheck, createValidator, createEventController);

router.get('/', eventsController);

module.exports = router;
