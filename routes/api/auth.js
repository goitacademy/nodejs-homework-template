const express = require("express");
const expressAsync = require("express-async-handler");
const ctrl = require("../../controllers/auth/");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  expressAsync(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  expressAsync(ctrl.login)
);

router.get("/current", authenticate, expressAsync(ctrl.getCurrent));

router.post("/logout", authenticate, expressAsync(ctrl.logout));
router.patch("/", authenticate, expressAsync(ctrl.updateUserSubscription));

module.exports = router;
