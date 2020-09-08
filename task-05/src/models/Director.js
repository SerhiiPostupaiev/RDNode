const Sequelize = require('sequelize');
const { Connection } = require('../dbLayer/dbService');

const Director = Connection.client.define('director', {
  firstName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  lastName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  birthYear: {
    allowNull: false,
    type: Sequelize.SMALLINT,
  },
});

module.exports = Director;
