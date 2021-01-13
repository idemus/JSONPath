"use strict";

let Slot = require('../../lib/slot');

class PrintToConsoleSlot extends Slot {

    constructor() {
        super("print");
    }

    execute(payload, userId) {
        return new Promise((resolve, reject) => {
            const message = payload['message'] || 'message not given';
            console.log(`Message from slot: ${message}`)
            resolve({
                "printed": true
            });
        });
    }
}

module.exports = new PrintToConsoleSlot();