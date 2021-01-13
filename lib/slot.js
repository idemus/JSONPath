// Formal template for a plugin slot

"use strict";

class Slot {

    /**
     * Create slot definition.
     * @param {string} slotName name of slot
     */
    constructor(slotName) {
        this.slotName = slotName;
    }

    /**
     * Execute slot.
     * @param {object} payload JSON payload
     * @param {number} userId user id
     * @return {object|Promise}
     */
    execute(payload, userId) {
        console.error(`Slot ${this.slotName} does not override execution code`);
    }

}

module.exports = Slot;