const fs = require('node:fs/promises');

class Response {
  constructor(response) {
    this.response = response;
  }

  setHeader(header, value) {
    this.response.setHeader(header, value);
  }

  json(object) {
    if (typeof object !== 'object') return console.log('Invalid data type to convert it in to JSON');

    this.response.setHeader('Content-Type', 'application/json');
    this.response.end(JSON.stringify(object));
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