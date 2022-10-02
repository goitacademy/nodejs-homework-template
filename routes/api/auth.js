const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { userJoiSchema } = require("../../models/user");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const router = express.Router();

router.post("/signup", validation(userJoiSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(userJoiSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
