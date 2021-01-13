"use strict";

let Slot = require('../../lib/slot');

class SayHelloSlot extends Slot {

    constructor() {
        super("sayHello");
    }

    execute(payload, userId) {
        let name = payload['name'] || 'World';
        return {
            "greeting": `Hello ${name}`
        }
    }
}

module.exports = new SayHelloSlot();