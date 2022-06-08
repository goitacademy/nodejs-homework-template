const express = require("express");

const router = express.Router();

const { ctrlWrapper, validation, tokenCheck } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models");

router.post("/signup", validation(joiSchema.userAdd), ctrlWrapper(ctrl.userSignUp));
router.post("/login", validation(joiSchema.userLogin), ctrlWrapper(ctrl.userLogin));
router.get("/current", tokenCheck, ctrlWrapper(ctrl.userCurrent));
router.get("/logout", tokenCheck, ctrlWrapper(ctrl.userLogout));
router.patch("/", tokenCheck, ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
