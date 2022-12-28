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

//create
app.post('/api/createmovie', (req, res) => {
  var moviename = _.get(req, ['body', 'name']);
  var mil = _.get(req, ['body', 'mil']);
  
  try{
    if(moviename && mil){
      db.query('insert into tbl_movie (name, mil) values (?,?) ', [
        moviename, mil
      ])
    } else {
      return res,status(200).json({
      RespCode: 400,
      RespMessage: 'bad: Invalid request',
      Log: 1
    })
    }
  }
  catch(error){
    console.log('ERR! :', error)
    return res,status(200).json({
      RespCode: 400,
      RespMessage: 'bad',
      Log: 0
    })
  }
})

module.exports = app;