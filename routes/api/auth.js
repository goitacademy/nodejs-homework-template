const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authontificate, upload } = require("../../middlewars");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authontificate, ctrl.getCurrent);

router.post("/logout", authontificate, ctrl.logout);

router.patch(
  "/avatars",
  authontificate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;
