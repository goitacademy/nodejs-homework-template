const express = require('express');
const { auth, validation, ctrlWrapper } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");
const { joiUserSchema } = require("../../models");

const router = express.Router();

router.post("/register", validation(joiUserSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;