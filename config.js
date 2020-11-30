const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth: true
});

module.exports = connection;

//   "env": { "PORT": 3000, "DB_HOST": "localhost", "DB_USER": "root", "DB_PASSWORD": "3698dd2de", "DB_NAME": "movies" }
