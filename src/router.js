const { Topics } = require('./controllers/topics');
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

      if (req.method === 'GET') {
        const params = this.getParamsParser(req.url.match(route.path)[1]);

        return route.handler(req, res, params);
      }
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

  getParamsParser(params) {
    return params.split('&').reduce(function (acc, item, i) {
      acc[item.split('=')[0]] = item.split('=')[1];
      return acc;
    }, {});
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

router.add({
  method: 'GET',
  path: /\/topics\?([0-9a-zA-Z|\=|\&]+)/,
  handler: Topics.get,
});

module.exports = router;
