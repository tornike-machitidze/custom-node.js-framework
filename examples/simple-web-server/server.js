const App = require('../../app');

const app = new App();

app.route('get', '/', (req, res) => {
  console.log('Request on: ', req.method, req.url);
  res.status(200).sendFile('./public/index.html', 'text/html');
});

app.route('get', '/index.js', (req, res) => {
  console.log('Request on: ', req.method, req.url);
  res.status(200).sendFile('./public/index.js', 'text/css');
});

app.route('get', '/styles.css', (req, res) => {
  console.log('Request on: ', req.method, req.url);
  res.status(200).sendFile('./public/styles.css', 'text/css');
});

app.route('get', '/horse.jpg', (req, res) => {
  console.log('Request on: ', req.method, req.url);
  res.status(200).sendFile('./public/horse.jpg', 'image/jpeg');
});

app.listen(4000, () => {
  console.log('Server is up and running ...');
});