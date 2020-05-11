const formatDate = date => new Date(date).toISOString();

const transformEvent = event => ({
  ...event.dataValues,
  ...{ date: formatDate(event.date) }
});

async function events(db) {
  const events = await db.Event.scope('withUser').findAll({
    include: [{
      model: db.User.scope('withEvents'),
      as: 'user'
    }]
  });

  return events.map(event => transformEvent(event));
}

async function createEvent({ title, description, price, date }, userId, db) {
  const event = await db.Event.create({
    title,
    description,
    price,
    date,
    userId
  });

  return await db.Event.scope('withUser').findByPk(event.id);
}

module.exports = {
  events,
  createEvent
}
