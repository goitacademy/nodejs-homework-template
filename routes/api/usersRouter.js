const express = require('express');

const { authMiddleware, controllerWrapper } = require('../../Middlewares');
const { users: ctrl } = require('../../Controllers');

const router = express.Router();

router.get('/current', authMiddleware, controllerWrapper(ctrl.getCurrent));

module.exports = router;
