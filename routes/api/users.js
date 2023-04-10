const express = require('express');

const { auth, control } = require('../../middlewares');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', control(auth), control(ctrl.getCurrent));

module.exports = router;
