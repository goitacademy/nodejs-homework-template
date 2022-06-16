const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.signUp));
router.post("/signin", validation(joiLoginSchema), ctrlWrapper(ctrl.signIn));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
