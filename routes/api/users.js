const express = require('express');
const { joiSubscriptionSchema} = require('../../models/user')

const router = express.Router();

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const {users: ctrl} = require("../../controllers")

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch('/', auth, validation(joiSubscriptionSchema), ctrlWrapper(ctrl.getCurrent));

module.exports = router;