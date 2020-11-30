const express = require('express');
const bodyParser = require('body-parser');

const connection = require('./config');

const app = express();
app.use(bodyParser());

connection.connect(err => {
  if (err) {
    console.error('CANNON CONNECT TO DB: ' + err.message);
    return;
  }
  console.log('CONNECTED ');
});

app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to my favorite movie list');
});

app.get('/api/movies', (req, res, next) => {
  connection.query('SELECT * from movies', (err, results) => {
    if (err) res.status(500).send('Cannot get all movies');
    res.status(200).json(results);
  });
});

app.get('/api/movies/:id', (req, res, next) => {
  connection.query('SELECT * FROM movies WHERE id=?', [req.params.id], (err, results) => {
    if (err) res.status(500).send('Error');
    res.status(200).json(results);
  });
});

app.get('/api/search/:year', (req, res, next) => {
  connection.query('SELECT * FROM movies WHERE year=?', [req.params.year], (err, results) => {
    if (err) res.status(500).send('Error');
    res.status(200).json(results);
  });
});

app.post('/api/movies/add', (req, res, next) => {
  const { title, director, year } = req.body;
  connection.query(
    `INSERT INTO movies (title, director, year, color, duration) VALUES ('${title}', '${director}', ${year}, 0, 120);`,
    (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).json('Movie added!');
    }
  );
});

app.get('/api/user', (req, res) => {
  res.status(401).send('Unauthorized');
});

app.listen(3000, () => console.log('Server up and running!'));
