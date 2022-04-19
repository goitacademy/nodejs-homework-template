const express = require("express");
const { users: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth } = require("../../middlewars");
const { joiSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signUp));

router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.currentUser));

module.exports = router;
