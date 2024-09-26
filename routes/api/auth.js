const express = require("express");

const { schemas } = require("../../models/users");

const { validateBody } = require("../../middlewares/validateBody");

const { authenticate } = require("../../middlewares/authenticate");

const { upload } = require("../../middlewares/upload");

const ctrl = require("../../controllers/authController");

const router = express.Router();

//signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

//signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
