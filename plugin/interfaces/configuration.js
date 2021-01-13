// Configuration interface for plugin

"use strict";

let express = require('express');
let description = require('../../lib/pluginDescription');
let path = require('path');

let route = express.static(path.join(__dirname, '../../public/configuration'));

const configurationViews = [{
    "title": "NodeDemo",
    "viewUri": `io.simplifier.ui5.plugin.${description.name}.demo`
}];

module.exports.enabled = true;
module.exports.baseUrl = '/configuration';
module.exports.route = route;
module.exports.configurationViews = configurationViews;