const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/user.js");
const ctrl = require("../../controllers/users");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// lodin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// get current user
router.get("/current", authenticate, ctrl.getCurrent);

// logout
router.post("/logout", authenticate, ctrl.logout);

// update subscription
router.patch("/", authenticate, ctrl.updateSubscription);

module.exports = router;
