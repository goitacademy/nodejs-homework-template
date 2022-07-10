const express = require("express");
const ctrl = require("../../controllers/auth");
const { validation, authMiddlewar, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(schemas.register), ctrl.register);

router.post("/signin", validation(schemas.register), ctrl.login);

router.get("/current", authMiddlewar, ctrl.getCurrent);

router.get("/logout", authMiddlewar, ctrl.logOut);

router.patch(
  "/avatars",
  authMiddlewar,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
