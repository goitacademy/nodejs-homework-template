const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/registration",
  validateBody(schemas.registrationSchema),
  ctrl.registration
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrl.login
);

module.exports = router;
