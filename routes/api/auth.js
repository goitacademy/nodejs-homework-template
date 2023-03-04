const express = require("express");
const ctrl = require("../../controllers/authController");
const { schemas } = require("../../models/user");
const { validateBody, authenticate } = require("../../middleware");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSub
);

module.exports = router;
