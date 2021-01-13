#!/usr/bin/env node

"use strict";

let settings = require('../lib/settings');
let description = require('../lib/pluginDescription');
let api = require('../lib/pluginApi');
let debug = require('debug')('plugin');
let app = require('../plugin/app');

debug(`Starting Simplifier Plugin ${description.name} ...`);

let service = require('../plugin/pluginService');

service.on('listening', () => {
    debug('HTTP service online');
    api.register().then(() => {
        debug("Registration successful");
    }, (error) => {
        console.error(error);
        process.exit(1);
    });
});

let stopService = () => {
    debug('Shutting down plugin');
    api.unregister().then((success) => {}, (error) => {});
    service.close();
};

process.on('SIGTERM', stopService);
process.on('SIGINT', stopService);