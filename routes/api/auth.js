const express = require("express");

const ctrl = require("../../controllers/auth-controllers");

const router = express.Router();

const {
  validateBody,
  authenticate,
  validateSubsBody,
} = require("../../decorators");

const { schemas } = require("../../models/user");

const jsonParser = express.json();

// signup
router.post(
  "/register",
  jsonParser,
  validateBody(schemas.registerSchema),
  ctrl.register
);

// signin
router.post(
  "/login",
  jsonParser,
  validateBody(schemas.loginSchema),
  ctrl.login
);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  jsonParser,
  validateSubsBody(schemas.updateSubsSchema),
  ctrl.updateSubscription
);
module.exports = router;
