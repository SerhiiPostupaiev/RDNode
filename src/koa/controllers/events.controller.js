const {
  events,
  createEvent
} = require('../services/event.service');

async function eventsController(ctx, next) {
  ctx.body = await events(ctx.dbContext);
}

async function createEventController(ctx, next) {
  ctx.body = await createEvent(ctx.request.body, ctx.userId, ctx.dbContext);
}

module.exports = {
  eventsController,
  createEventController
}
