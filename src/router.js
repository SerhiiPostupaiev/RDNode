const { Genres } = require('./controllers/genres');
const { Directors } = require('./controllers/directors');
const { Movies } = require('./controllers/movies');

const responseHelpers = require('./response/methods');

class Router {
  constructor() {
    this.routes = [];
  }

  add(item) {
    this.routes.push(item);

    return this;
  }

  async handleRoute(req, res) {
    const route = this.findRoute(req, res);

    let idParam = null;

    if (route && typeof route.path === 'object') {
      idParam = req.url.match(route.path)[1];
    }

    if (route) {
      let body = null;
      if (req.method === 'POST' || req.method === 'PUT') {
        body = await this.bodyParser(req);
      }

      return route.handler(req, res, idParam, body);
    } else {
      return responseHelpers.error(res, 'Endpoint not found', 404);
    }
  }

  bodyParser(req) {
    return new Promise((resolve, reject) => {
      try {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          resolve(JSON.parse(body));
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  findRoute(req, res) {
    return this.routes.find((item) => {
      const methodMatch = item.method === req.method;

      let pathMatch = false;

      if (typeof item.path === 'object') {
        pathMatch = req.url.match(item.path);
      } else {
        pathMatch = item.path === this.clearSlashes(req.url);
      }

      return methodMatch && pathMatch;
    });
  }

  clearSlashes(route) {
    if (route[route.length - 1] === '/') {
      return route.slice(0, -1);
    }

    return route;
  }
}

const router = new Router();

router
  .add({
    method: 'GET',
    path: '/directors',
    handler: Directors.get,
  })
  .add({
    method: 'GET',
    path: /\/directors\/([0-9a-z]+)/,
    handler: Directors.get,
  })
  .add({
    method: 'POST',
    path: '/directors',
    handler: Directors.post,
  })
  .add({
    method: 'PUT',
    path: /\/directors\/([0-9a-z]+)/,
    handler: Directors.put,
  })
  .add({
    method: 'DELETE',
    path: /\/directors\/([0-9a-z]+)/,
    handler: Directors.delete,
  })
  .add({
    method: 'GET',
    path: '/genres',
    handler: Genres.get,
  })
  .add({
    method: 'GET',
    path: /\/genres\/([0-9a-z]+)/,
    handler: Genres.get,
  })
  .add({
    method: 'POST',
    path: '/genres',
    handler: Genres.post,
  })
  .add({
    method: 'PUT',
    path: /\/genres\/([0-9a-z]+)/,
    handler: Genres.put,
  })
  .add({
    method: 'DELETE',
    path: /\/genres\/([0-9a-z]+)/,
    handler: Genres.delete,
  })
  .add({
    method: 'GET',
    path: '/movies',
    handler: Movies.get,
  })
  .add({
    method: 'GET',
    path: /\/movies\/([0-9a-z]+)/,
    handler: Movies.get,
  })
  .add({
    method: 'POST',
    path: '/movies',
    handler: Movies.post,
  })
  .add({
    method: 'PUT',
    path: /\/movies\/([0-9a-z]+)/,
    handler: Movies.put,
  })
  .add({
    method: 'DELETE',
    path: /\/movies\/([0-9a-z]+)/,
    handler: Movies.delete,
  });

module.exports = router;
