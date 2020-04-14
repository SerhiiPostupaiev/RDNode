const http = require('http');
const url = require('url');

const PORT = 3000;

const router = require('./router');

const app = http.createServer(async (req, res) => {
  await router.handleRoute(req, res);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
