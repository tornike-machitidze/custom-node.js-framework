const http = require('http');

const Response = require('./response');

class App {
  constructor() {
    this.server = http.createServer();
    this.routes = new Map();

    this.server.on('request', (req, res) => {

      const response = new Response(res);
      const request = req;

      const { url, method } = request;
      const handler = this.routes.get(method) && this.routes.get(method).get(url);

      if (!handler || typeof handler !== 'function') {
        return response.status(404).send('Route was not found!');
      }

      handler(request, response);
    });
  }

  listen(port, host, cb) {
    typeof host === 'string' ? this.server.listen(port, host, cb) : this.server.listen(port, host);
  }

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