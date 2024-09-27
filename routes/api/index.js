const express = require("express");
const router = express.Router();

router.use('/auth', require('./auth'))
router.use('/contacts', require('./contacts'))

module.exports = router;
