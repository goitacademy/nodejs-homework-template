const express = require('express')

const { validation, auth, ctrlWrapper } = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema, joiUpdateSubSchema} = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/", auth, validation(joiUpdateSubSchema), ctrlWrapper(ctrl.updateSub));

module.exports = router;