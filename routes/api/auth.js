const express = require('express');
const { auth: ctrl } = require('../../controllers');
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth(["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST"]), ctrlWrapper(ctrl.logout));

router.post("/refreshtoken", auth(["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR"]), ctrlWrapper(ctrl.refreshToken));

module.exports = router;
