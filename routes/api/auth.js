const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");

const {
  validateBodyForPost,
  authenticate,
  upload,
} = require("../../middleWare");

const schemas = require("../../schemas/auth");

router.post(
  "/register",
  validateBodyForPost(schemas.registerSchema),
  ctrl.register
);

router.post("/login", validateBodyForPost(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
