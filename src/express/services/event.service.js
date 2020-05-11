const formatDate = date => new Date(date).toISOString();

const transformEvent = event => ({
  ...event.dataValues,
  ...{ date: formatDate(event.date) }
});

async function events(db) {
  try {
    const events = await db.Event.scope('withUser').findAll({
      include: [{
        model: db.User.scope('withEvents'),
        as: 'user'
      }]
    });

    return events.map(event => transformEvent(event));
  } catch (err) {
    throw new Error(err);
  }
}

async function createEvent({ title, description, price, date }, userId, db) {
  try {
    const event = await db.Event.create({
      title,
      description,
      price,
      date,
      userId
    });

    return await db.Event.scope('withUser').findByPk(event.id);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  events,
  createEvent
}
