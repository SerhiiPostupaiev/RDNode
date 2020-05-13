const Hapi = require('@hapi/hapi');

const router = require('./routes');

const authMiddleware = require('./middlewares/auth-middleware');

const PORT = 3001;

async function createHapiServer() {
  const server = Hapi.Server({
    port: PORT,
  });

  await server.register(require('hapi-auth-jwt2'));

  // https://hapi.dev/tutorials/auth/?lang=en_US
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET_KEY,
    validate: authMiddleware,
  });

  server.route(router);

  server.ext('onRequest', (req, h) => {
    console.log(`Hapi time: ${Date.now()}`);
    return h.continue;
  });

  server.events.on('response', function (request) {
    console.log(
      `${request.info.remoteAddress}: ${request.method.toUpperCase()} ${
        request.path
      } --> ${request.response.statusCode}`
    );
  });

  server
    .start()
    .then(() => console.log(`Hapi server running on http://localhost:${PORT}`))
    .catch((err) => console.error(err));
}

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

module.exports = createHapiServer;
