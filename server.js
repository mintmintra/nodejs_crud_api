const express = require('express');
const app = express();
const mysql = require('mysql');
const _ = require('lodash');
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

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
  console.log('moviename', moviename)
  console.log('mil',mil)
  try{
    if(moviename && mil){
      db.query('insert into tbl_movie (name, mil) values (?,?) ', [
        moviename, mil
      ],(err, resp, field) => {
        if(resp){
          return res.status(200).json({
            RespCode: 200,
            RespMessage: "success"
          })
        } else {
          console.log('ERR 1! : Bad Sql')
          return res,status(200).json({
            RespCode: 400,
            RespMessage: 'bad: bad sql',
            Log: 2
    })
        }
      })
    } else {
      console.log('ERR 2! : Invalid request')
      return res,status(200).json({
      RespCode: 400,
      RespMessage: 'bad: Invalid request',
      Log: 1
    })
    }
  }
  catch(error){
    console.log('ERR 0! :', error)
    return res,status(200).json({
      RespCode: 400,
      RespMessage: 'bad',
      Log: 0
    })
  }
})

module.exports = app;