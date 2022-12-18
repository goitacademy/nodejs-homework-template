const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { auth: tokenCheck, validation, ctrlWrapper } = require("../../helpers");
const { joiSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.patch("/", tokenCheck, ctrlWrapper(ctrl.updateSubscription));
router.get("/logout", tokenCheck, ctrlWrapper(ctrl.logout));
router.get("/current", tokenCheck, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
