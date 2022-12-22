const express = require("express");
const { validate } = require("../../schema/schema");

const { signup: ctrl } = require("../../controllers/");
const { joyRegisterSchema } = require("../../models/users");
const { auth, upload } = require("../../midlewares");

const router = express.Router();

router.post("/signup", validate(joyRegisterSchema), ctrl.register);

router.post("/login", validate(joyRegisterSchema), ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.post("/logout", auth, ctrl.logout);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatars);

module.exports = router;
