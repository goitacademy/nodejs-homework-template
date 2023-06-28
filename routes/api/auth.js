const express = require("express");
const router = express.Router();
const schemas = require("../../schemas/users");
const { validateBody, authenticate } = require("../../middlewars");
const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);

module.exports = router;
