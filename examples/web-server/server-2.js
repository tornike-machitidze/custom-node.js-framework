const App = require('../../app');

const USERS = [
  { id: 1, name: 'Tornike Machitidze', username: 'tornike123', password: 'tornike123' },
  { id: 2, name: 'Pitter Parker', username: 'pitter123', password: 'pitter123' },
  { id: 3, name: 'James Brown', username: 'james123', password: 'james123' },
];

const POSTS = [
  {
    id: 1,
    title: 'Post 1',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    userId: 1
  },
  {
    id: 2,
    title: 'Post 2',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    userId: 1
  },
  {
    id: 3,
    title: 'Post 3',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    userId: 2
  }
];

const PORT = 8002;

const app = new App();

// Serving Files
app.route('get', '/', (req, res) => {
  console.log(`Request on: ${req.method}  ${req.url}`);
  res.status(200).sendFile('./public/index.html', 'text/html');
});

app.route('get', '/login', (req, res) => {
  console.log(`Request on: ${req.method}  ${req.url}`);
  res.status(200).sendFile('./public/index.html', 'text/html');
});

app.route('get', '/styles.css', (req, res) => {
  console.log(`Request on: ${req.method}  ${req.url}`);
  res.status(200).sendFile('./public/styles.css', 'text/css');
});

app.route('get', '/scripts.js', (req, res) => {
  console.log(`Request on: ${req.method}  ${req.url}`);
  res.status(200).sendFile('./public/scripts.js', 'application/javascript');
});

// API Routes

// send list of the posts
app.route('get', '/api/posts', (req, res) => {
  console.log(`Request on: ${req.method}  ${req.url}`);
  const posts = POSTS.map(post => {
    const user = USERS.find(user => user.id === post.userId);

    post.author = user.name;
    return post;
  });
  res.status(200).json(posts);
});

// login functionality
app.route('post', '/api/login', (req, res) => {
  console.log(`Request on: ${req.method}  ${req.url}`);
  console.log('Request body: ', req.body);

  const { username, password } = req.body;

  const user = USERS.find(user => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid username or password!' });
  }

  res.status(200).json({ message: 'Logged in successfully!' });
});

app.route('get', '/api/user', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});