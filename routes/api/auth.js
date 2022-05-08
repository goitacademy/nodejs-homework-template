const express = require("express");
const { validation, ctrlWrapper, auth } = require("../../middleware");
const ctrl = require("../../controllers");
const { joiSchema } = require("../../models/user");

const router = express.Router();
router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
module.exports = router;
