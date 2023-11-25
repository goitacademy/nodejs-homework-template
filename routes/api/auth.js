const express = require("express");
const ctrl = require("../../controllers/auth");
const { emptyBody, validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  emptyBody(),
  validateBody(schemas.registerSchema),
  ctrl.register
);
router.post(
  "/login",
  emptyBody(),
  validateBody(schemas.loginSchema),
  ctrl.login
);
router.get("/current", authenticate, ctrl.current);
router.post("/logout", authenticate, ctrl.logout);
router.patch("/", authenticate, ctrl.updateSubscription);

module.exports = router;
