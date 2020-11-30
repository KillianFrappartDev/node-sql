const express = require('express');
const connection = require('./config');

const app = express();

connection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to my favorite movie list');
});

app.get('/api/movies', (req, res, next) => {
  connection.query('SELECT * from movies', (err, results) => {
    if (err) res.status(500).send('Error retrieving data');
    res.status(200).json(results);
  });
});

app.get('/api/movies/:id', (req, res, next) => {
  connection.query('SELECT * FROM movies WHERE id=?', [req.params.id], (err, results) => {
    if (err) res.status(500).send('Error');
    res.status(200).json(results);
  });
});

app.get('/api/search/:year', (req, res) => {
  connection.query('SELECT * FROM movies WHERE year=?', [req.params.year], (err, results) => {
    if (err) res.status(500).send('Error');
    res.status(200).json(results);
  });
});

app.get('/api/user', (req, res) => {
  res.status(401).send('Unauthorized');
});

app.listen(3000, () => console.log('Server up and running!'));
