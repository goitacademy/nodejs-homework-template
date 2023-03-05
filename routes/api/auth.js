const express = require('express');

const ctrl = require("../../controllers/auth");

const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user")


router.post("/signup", validateBody(schemas.registerSchema), ctrl.signup);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate,  ctrl.logout);
router.patch("/users", authenticate, ctrl.updateSubscription);
module.exports = router;