const express = require('express');
const path = require('path');
const Waterline = require('waterline');
const config = require('./config');
const joi = require('joi');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('origin'));
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, ' +
      'Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// app dependencies
app.set('router', express.Router());
app.set('config', config);

const waterline = new Waterline();
waterline.loadCollection(require('./models/users')(Waterline));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Endpoint routes
app.use(require('./api/users')(app));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

waterline.initialize(config, (err, models) => {
  if (err) throw err;

  app.models = models.collections;
  app.connections = models.connections;
  console.log('App running on port: 3000');
});

module.exports = app;
