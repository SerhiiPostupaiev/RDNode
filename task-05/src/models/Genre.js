const Sequelize = require('sequelize');
const { Connection } = require('../dbLayer/dbService');

const Genre = Connection.client.define('genre', {
  title: {
    type: Sequelize.STRING,
  },
});

module.exports = Genre;
