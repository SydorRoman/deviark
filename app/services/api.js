// Node modules
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('../helpers/error-maker');

const usersRoute = require('../routes/user');
const app = express();

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors());

app
  .use('/users', usersRoute);

app
  .listen(8080)
  .setTimeout(500000);

module.exports = app;
