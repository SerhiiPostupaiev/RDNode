class EventController {
  constructor(entityService) {
    this.entityService = entityService;
  }

  getEvents = async (ctx, next) => {
    ctx.body = await this.entityService.events(ctx.dbContext);
  };

  createEvent = async (ctx, next) => {
    ctx.body = await this.entityService.createEvent(
      ctx.request.body,
      ctx.userId,
      ctx.dbContext
    );
  };

  updateEvent = async (ctx, next) => {
    ctx.body = await this.entityService.updateEvent(
      ctx.request.body,
      ctx.userId,
      ctx.dbContext
    );
  };

  deleteEvent = async (ctx, next) => {
    ctx.body = await this.entityService.deleteEvent(ctx.request.body);
  };
}

module.exports = EventController;
