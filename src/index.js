const http = require('http');

const router = require('./router');
const { Connection } = require('./dbLayer/dbService');

const PORT = 3000;

Connection.connectToMongoDB();

const app = http.createServer(async (req, res) => {
  await router.handleRoute(req, res);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
