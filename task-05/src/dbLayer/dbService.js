const Sequelize = require('sequelize');
const dbConfigs = require('./dbConfig.json');

class Connection {
  static async connectToPostgres() {
    try {
      if (!Connection.client) {
        Connection.client = new Sequelize(dbConfigs.postgresURI, {
          define: {
            timestamps: false,
          },
        });

        await Connection.client
          .authenticate()
          .then(() => console.log('Connected to postgres'))
          .catch((err) => console.error(err));
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async synchronize() {
    await Connection.client.sync().catch((err) => console.error(err));
  }
}

Connection.client = null;

module.exports = { Connection };
