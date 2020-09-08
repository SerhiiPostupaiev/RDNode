const redis = require('redis');

class Connection {
  static connectToRedis(port, triggerServer) {
    if (!Connection.client) {
      Connection.client = redis.createClient({
        host: 'redis',
        port,
      });

      Connection.client.on('connect', () => {
        console.log('Redis client connected');
        triggerServer();
      });

      Connection.client.on('error', (err) => {
        console.err(err);
      });
    }
  }
}

Connection.client = null;

module.exports = { Connection };
