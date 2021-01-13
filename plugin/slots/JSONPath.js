"use strict";

let Slot = require('../../lib/slot');
let JSONPath = require('JSONPath');

class JSONPath extends Slot {

    constructor() {
        super("JSONPath");
    }

    execute(payload, userId) {
        let name = payload['name'] || 'World';
        return {
            "greeting": `Hello ${name} from JSONPath`
        }
    }
}

module.exports = new JSONPath();
