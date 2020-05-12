const formatDate = (date) => new Date(date).toISOString();

const transformEvent = (event) => ({
  ...event.dataValues,
  ...{ date: formatDate(event.date) },
});

class EventService {
  constructor(model, userModel) {
    this.model = model;
    this.userModel = userModel;
  }

  events = async () => {
    const events = await this.model.scope('withUser').findAll({
      include: [
        {
          model: this.userModel.scope('withEvents'),
          as: 'user',
        },
      ],
    });

    return events.map((event) => transformEvent(event));
  };

  createEvent = async ({ title, description, price, date }, userId) => {
    const event = await this.model.create({
      title,
      description,
      price,
      date,
      userId,
    });

    return await this.model.scope('withUser').findByPk(event.id);
  };

  updateEvent = async (payload, userId) => {
    const event = await this.model.findByPk(payload.eventId);

    if (!event) {
      return { msg: 'Event not found' };
    }

    return await event.update(payload, {
      where: { id: payload.eventId },
      returning: true,
    });
  };

  deleteEvent = async ({ eventId }) => {
    const event = await this.model.findByPk(eventId);

    if (!event) {
      return { msg: 'Event not found' };
    }

    await event.destroy();

    return { msg: 'deleted' };
  };
}

module.exports = EventService;
