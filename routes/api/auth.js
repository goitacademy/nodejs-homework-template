const express = require("express");
const router = express.Router();
const ctrl  = require("../../controllers/auth")
const { validateBody, authenticate } = require("../../middleware");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { registerSchema, loginSchema } = require("../../models/user");



router.post("/register", validateBody(registerSchema), ctrlWrapper(ctrl.register))

router.post("/login",validateBody(loginSchema),ctrlWrapper(ctrl.login)
);

router.get("/current",ctrlWrapper(authenticate),ctrlWrapper(ctrl.getCurrent));
module.exports = router;