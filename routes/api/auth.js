const express = require('express')

const router = express.Router();

const { joiRegistrationSchema, joiLoginSchema } = require("../../models/user");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

router.get('/logout', auth, ctrlWrapper(ctrl.logout))

router.post('/signup', validation(joiRegistrationSchema), ctrlWrapper(ctrl.signup));

router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;