const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schema } = require("../../models/user");

const router = express.Router();
router.post("/register", validateBody(schema.registerSchema), ctrl.register);

router.post("/login", validateBody(schema.loginSchema), ctrl.login);

router.get("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch("/", authenticate, ctrl.undateSubscribe);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;
