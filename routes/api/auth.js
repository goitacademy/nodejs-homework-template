const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.subscriptionChange
);

module.exports = router;
