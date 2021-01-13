"use strict";

let debug = require('debug')('pluginDescription');

const descriptionFile = 'conf/plugin.json';

class PluginDescription {
    constructor(json) {
        this.name = json['name'] || null;
        this.description = json['description'] || null;
        this.version = json['version'] || null;
        this.vendor = json['vendor'] || null;
        this._checkValid();
    }

    _checkValid() {
        for (let key in this) {
            if (this.hasOwnProperty(key) && this[key] === null) {
                console.error(`Missing key '${key}' in plugin description file ${descriptionFile}`);
                process.exit(1);
            }
        }
    }
}

debug(`Loading plugin description from ${descriptionFile} ...`);

let descriptionJson = require("../conf/plugin.json");
module.exports = new PluginDescription(descriptionJson);