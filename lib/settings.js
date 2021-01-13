"use strict";

let debug = require('debug')('settings');

const settingsFile = '../conf/settings.json';

class PluginSettings {
    constructor(json) {
        let registration = json['registration'] || {};
        this.registrationHost = registration['host'] || '127.0.0.1';
        this.registrationPort = registration['port'] || '8085';
        this.registrationSecret = registration['secret'];
        let http = json['http'] || {};
        this.listenInterface = http['interface'] || '0.0.0.0';
        this.listenPort = http['port'] || '8888';
        this.exposedHost = http['exposedHost'] || '127.0.0.1';
        this.exposedPort = http['exposedPort'] || this.listenPort;
        this.timeout = json['timeoutSeconds'] || 60;
        this._checkValid();
    }

    _checkValid() {
        if (!this.registrationSecret) {
            console.error(`Missing key 'registration/secret' in plugin configuration file ${settingsFile}`);
            process.exit(1);
        }
    }
}

debug(`Loading plugin settings from ${settingsFile} ...`);

let settingsJson = require("../conf/settings.json");
module.exports = new PluginSettings(settingsJson);
