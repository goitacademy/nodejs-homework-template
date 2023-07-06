const express = require("express");

const ctrl = require("../../controlers");

const { validateBody } = require("../../middlewares");

const { schemasUser } = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemasUser.registerSchema),
  ctrl.register
);

router.post("/login", validateBody(schemasUser.loginSchema), ctrl.login);

module.exports = router;
