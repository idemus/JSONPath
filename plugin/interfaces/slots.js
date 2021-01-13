// Slot interface for plugin

"use strict";

let express = require('express');
let router = express.Router();
let debug = require('debug')('slotInterface');

const slots = [
    require('../slots/JSONPath'),
    require('../slots/PrintToConsoleSlot')
];

let slotNames = slots.map((slot) => slot.slotName);

// ----------------
// -- TODO:
// -- Check Plugin Secret
// -- Extract User ID
// ----------------

slots.forEach((slot) => {
    debug(`Register slot ${slot.slotName}`);
    router.post(`/${slot.slotName}`, (req, res, next) => {
        let payload = req.body;
        let userId = 1; // TODO
        let executionResult;
        try {
            executionResult = slot.execute(payload, userId);
        } catch (e) {
            console.error(`Error in slot ${slot.slotName}`, e);
            res.statusCode = 500;
            res.json({success: false, message: "Unhandled Exception"});
        }
        if (executionResult instanceof Promise) {
            executionResult.then((successJson) => {
                res.json(successJson);
            }, (error) => {
                res.statusCode = 500;
                res.json({success: false, message: error});
            });
        } else {
            res.json(executionResult);
        }
    })
});

module.exports.enabled = true;
module.exports.baseUrl = '/slots';
module.exports.route = router;
module.exports.slots = slotNames;
