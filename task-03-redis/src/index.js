const http = require('http');

const { Connection } = require('./dbLayer/dbService');
const router = require('./router');

const PORT = 3000;
const REDIS_PORT = 6379;

Connection.connectToRedis(REDIS_PORT, runServer);

function runServer() {
  const app = http.createServer(async (req, res) => {
    await router.handleRoute(req, res);
  });

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
