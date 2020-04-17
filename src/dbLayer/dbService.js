const { Client, Pool } = require('pg');

class Connection {
  static async connectToPostgres(triggerServer) {
    try {
      if (!Connection.client) {
        Connection.client = new Client({
          host: process.env.POSTGRES_HOST,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
        });

        await Connection.client.connect();
      }

      console.log('Connected to postgres');
      triggerServer();
    } catch (err) {
      console.error(err);
    }
  }
}

Connection.client = null;

module.exports = { Connection };
