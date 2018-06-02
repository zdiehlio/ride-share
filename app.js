const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise

//check if running in test mode, if true will not connect to DB
if(process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber')
}

const app = express()

app.use(bodyParser.json())
routes(app)

app.use((err, req, res, next) => {
  //err will be equal to the error of previous middleware if thrown
  res.status(422).send({ error: err.message })
})

module.exports = app