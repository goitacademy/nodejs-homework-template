const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { validation, authentificate, upload } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const { joiSignupSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();
// signup
router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));

// login
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

// current
router.get("/current", authentificate, ctrlWrapper(ctrl.getCurrent) )

// logout
router.post("/logout", authentificate, ctrlWrapper(ctrl.logout))

// avatar
router.patch("/avatars", authentificate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;
