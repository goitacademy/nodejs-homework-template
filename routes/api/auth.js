const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenicate } = require("../../middlewares");
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

router.get(
  "/current",
  authenicate,
  ctrl.getCurrent
);

router.post(
  "/logout",
  authenicate,
  ctrl.logout
);

module.exports = router;
