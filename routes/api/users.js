const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
// const { joiSchema, statusJoiSchema } = require("../../models/contact");
const { users: ctrl } = require("../../controllers");
const { joiAuthSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiAuthSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
module.exports = router;
