const express = require("express");

const { users: ctrl } = require("../../controllers");

const { validation, ctrlWrapper, current } = require("../../middlewares");

const { joiSingupSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSingupSchema), ctrlWrapper(ctrl.singup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/current", current, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", current, ctrlWrapper(ctrl.logout));

module.exports = router;
