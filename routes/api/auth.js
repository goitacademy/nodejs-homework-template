const express = require("express");
const ctrl = require("../../controlers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const schema = require("../../schemas/user");

const router = express.Router();

router.post("/register", validateBody(schema.registerSchema), ctrl.register);
router.post("/login", validateBody(schema.registerSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.get("/logout", authenticate, ctrl.logout);
router.patch(
  "/",
  authenticate,
  validateBody(schema.subscriptionSchema),
  ctrl.changeSubscription
);

module.exports = router;
