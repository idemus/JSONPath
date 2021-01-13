// Proxy interface for plugin

"use strict";

let express = require('express');
let router = express.Router();

// ----------------
// -- TODO:
// -- Check Plugin Secret
// -- Check Authentication required
// -- Extract User ID
// ----------------

/* Dummy */
router.all('/', function(req, res, next) {
  res.send('This is the API interface');
});

module.exports.enabled = true;
module.exports.baseUrl = '/api';
module.exports.authenticationRequired = true;
module.exports.route = router;