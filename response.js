const fs = require('node:fs/promises');

class Response {
  constructor(response) {
    this.response = response;
  }

  json(json) {
    this.response.setHeader('Content-Type', 'application/json');
    this.response.end(json);
  }

  send(text) {
    this.response.setHeader('Content-Type', 'text/plane');
    this.response.end(text);
  }

  status(statusCode) {
    this.response.statusCode = statusCode;
    return this;
  }

  async sendFile(path, mime) {
    const filehandle = await fs.open(path, 'r');
    const readStream = filehandle.createReadStream();

    this.response.setHeader('Content-Type', mime);
    readStream.pipe(this.response);
  }

  end() {
    this.response.end();
  }
}

module.exports = Response;