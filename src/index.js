const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const router = require('./router');
const { Connection } = require('./dbLayer/dbService');
const initialQueries = require('./queries/initial');

const PORT = 3000;

Connection.connectToPostgres(runServer);

function runServer() {
  const app = http.createServer(async (req, res) => {
    await router.handleRoute(req, res);
  });

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

  // initialQueries();
}
