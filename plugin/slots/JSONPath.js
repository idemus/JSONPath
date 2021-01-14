"use strict";

let Slot = require('../../lib/slot');
let JsonPath = require('jsonpath');

class JSONPath extends Slot {

    constructor() {
        super("checkJSON");
    }

    execute(payload, userId) {
        let name = payload['name'] || 'World';
        return {
            "greeting": `Hello ${name} from JSONPath`
        }
    }
}

module.exports = new JSONPath();
