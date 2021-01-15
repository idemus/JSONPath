"use strict";

let Slot = require('../../lib/slot');
let jp = require('jsonpath');

class JSONPath extends Slot {

    constructor() {
        super("checkJSONForAutomaticProvisioning");
    }

    execute(payload, userId) {
        let jsonToCheck = payload['json'];
        let query = payload['query'];

        var result = jp.query(jsonToCheck, query);
        return result
    }
}

module.exports = new JSONPath();
