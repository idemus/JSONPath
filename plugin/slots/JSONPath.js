"use strict";

let Slot = require('../../lib/slot');
let jp = require('jsonpath');

class JSONPath extends Slot {

    constructor() {
        super("checkJSON");
    }

    execute(payload, userId) {
        let jsonToCheck = payload['json'];

        var authors = jp.query(jsonToCheck, '$..author');
        return {
            "result": authors
        }
    }
}

module.exports = new JSONPath();
