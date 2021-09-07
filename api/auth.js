const express = require("express");

const { auth: ctrl } = require("../controllers");

const router = express.Router();

const { validation, authenticate, upload } = require("../middlewares");
const {
  user: { joiSchema },
} = require("../models/schemas");

router.post("/signup", validation(joiSchema), ctrl.signup);
// router.post("/register", ctrl.register);

router.post("/signin", ctrl.signin);
// router.post("/login", ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.uploadAvatar
);

module.exports = router;
