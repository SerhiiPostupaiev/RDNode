const Sequelize = require('sequelize');
const { Connection } = require('../dbLayer/dbService');

const Movie = Connection.client.define('movie', {
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = Movie;
