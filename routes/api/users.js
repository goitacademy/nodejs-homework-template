const express = require('express');
const router = express.Router();
const { validation, ctrlWrapper } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');

router.post('/register', ctrlWrapper(ctrl.register));

module.exports = router;
