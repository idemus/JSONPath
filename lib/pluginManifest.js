// Plugin Manifest for Simplifier registration

"use strict";

let description = require('./pluginDescription');
let settings = require('./settings');

let slotInterface = require('../plugin/interfaces/slots');
let proxyInterface = require('../plugin/interfaces/proxy');
let configurationInterface = require('../plugin/interfaces/configuration');

/**
 * Remove leading slash
 * @param {string} url path url
 * @return {string}
 */
function stripSlash(url) {
    return url.replace(/^\//, '');
}

const manifest = {
    "plugin": {
        "name": description.name,
        "description": description.description,
        "vendor": description.vendor,
        "version": description.version
    },
    "connection": {
        "host": settings.exposedHost,
        "port": settings.exposedPort
    },
    "permissionObjects": []
};

if (slotInterface.enabled) {
    manifest.slotInterface = {
        "baseUrl": stripSlash(slotInterface.baseUrl),
        "slots": slotInterface.slots
    }
}

if (proxyInterface.enabled) {
    manifest.proxyInterface = {
        "baseUrl": stripSlash(proxyInterface.baseUrl),
        "authenticationRequired": proxyInterface.authenticationRequired
    }
}

if (configurationInterface.enabled) {
    manifest.configurationInterface = {
        "baseUrl": stripSlash(configurationInterface.baseUrl),
        "views": configurationInterface.configurationViews
    }
}

module.exports = manifest;