// Plugin HTTP Service

"use strict";

let express = require('express');
let path = require('path');

let debug = require('debug')('app');
let logger = require('morgan');
let bodyParser = require('body-parser');

let slotInterface = require('./interfaces/slots');
let apiInterface = require('./interfaces/proxy');
let configurationInterface = require('./interfaces/configuration');

let app = express();

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (slotInterface.enabled) {
    debug(`Slot interface enabled at ${slotInterface.baseUrl}`);
    app.use(slotInterface.baseUrl, slotInterface.route);
}
if (apiInterface.enabled) {
    debug(`API interface enabled at ${apiInterface.baseUrl}`);
    app.use(apiInterface.baseUrl, apiInterface.route);
}
if (configurationInterface.enabled) {
    debug(`Configuration interface enabled at ${configurationInterface.baseUrl}`);
    app.use(configurationInterface.baseUrl, configurationInterface.route);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    let message = err.message;
    let error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(`<body><h1>${message}</h1><p>${error}</p></body>`)
});

module.exports = app;