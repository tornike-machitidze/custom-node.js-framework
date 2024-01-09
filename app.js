const http = require('http');
const Response = require('./response');

class App {
  constructor() {
    this.server = http.createServer();
    this.routes = new Map();
    this.middlewares = [];

    this.server.on('request', (req, res) => {

      const response = new Response(res);
      const request = req;

      const { url, method } = request;
      const handler = this.routes.get(method) && this.routes.get(method).get(url);

      // run the middlewares first
      const runMiddlewares = (req, res, middlewares, index) => {
        if (index === middlewares.length) {
          return (!handler || typeof handler !== 'function') ? res.status(404).send('Route was not found!') : handler(req, res);
        }

        middlewares[index](req, res, () => {
          runMiddlewares(req, res, middlewares, index + 1);
        });

      };

      runMiddlewares(request, response, this.middlewares, 0);
    });
  }

  listen(port, host, cb) {
    typeof host === 'string' ? this.server.listen(port, host, cb) : this.server.listen(port, host);
  }

  // registers middlewares
  beforeEach(cb) {
    this.middlewares.push(cb);
  }

  // registers routes
  route(method, url, cb) {
    const registeredRoutes = this.routes.get(method.toUpperCase());
    if (!registeredRoutes) {
      this.routes.set(method.toUpperCase(), new Map([[url, cb]]));
    } else {
      registeredRoutes.set(url, cb);
    }

    console.log(this.routes);
  }

}

module.exports = App;