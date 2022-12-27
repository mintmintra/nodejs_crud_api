const express = require('express');
const app = express();
const mysql = require('mysql');
const _ = require('lodash');

const server = app.listen(3000, () => {
    console.log('Nodejs is running on port 3000!')
})

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movie"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = app;