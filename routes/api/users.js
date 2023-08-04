const express = require("express");

const router = express.Router();

const { ctrlAuth } = require("../../controllers");

const { userJoiSchemas } = require("../../models");

const { validateBody, authenticate } = require("../../middelewares");

router.post(
  "/register",
  validateBody(userJoiSchemas.registerSchema),
  ctrlAuth.register
);
router.post("/login", validateBody(userJoiSchemas.loginSchema), ctrlAuth.login);

router.get("/current", authenticate, ctrlAuth.getCurrent);

router.get("/logout", authenticate, ctrlAuth.logout);

router.patch(
  "/",
  validateBody(userJoiSchemas.updateStatusSchema),
  authenticate,
  ctrlAuth.updateStatusUser
);

module.exports = router;