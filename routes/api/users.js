const express = require('express');
const { usersController } = require('../../controllers');
const { checkAuth } = require('../../middlewares');

const router = express.Router();

router.get('/current', checkAuth, usersController.getCurrent);

module.exports = router;