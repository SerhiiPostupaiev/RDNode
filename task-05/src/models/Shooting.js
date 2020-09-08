const { Connection } = require('../dbLayer/dbService');

const Shooting = Connection.client.define('shooting', {});

module.exports = Shooting;
