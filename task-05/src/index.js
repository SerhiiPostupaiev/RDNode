const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const { Connection } = require('./dbLayer/dbService');
const PORT = process.env.PORT || 5000;

main();

async function runServer() {
  const router = require('./router');

  const app = http.createServer(async (req, res) => {
    await router.handleRoute(req, res);
  });

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

async function main() {
  await Connection.connectToPostgres();

  await runServer();
}
