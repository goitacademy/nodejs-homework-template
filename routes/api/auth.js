const express = require('express');
// /api/users

const { validation, ctrlWrapper, auth } = require('../../middlewares');
// const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { auth: ctrl } = require('../../controllers');
// const { users: ctrlUsers } = require('../../controllers');

const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validation(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
