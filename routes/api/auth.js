const express = require("express");
const ctrl = require("../../controllers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const fs = require("fs/promises");

const schemas = require("../../schemas/authSchema");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.post("/avatars", authenticate, upload.single("avatar"), ctrl.addAvatar);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.subscription
);

module.exports = router;
