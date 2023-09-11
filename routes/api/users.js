const { Router } = require("express");

const { validateBody, authenticate } = require("../../middleware");
const ctrl = require("../../contacts/controllers/users");
const { schemas } = require("../../models/user");

const router = Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
	"/",
	authenticate,
	validateBody(schemas.updateSubscriptionSchema),
	ctrl.updateSubscription
);

module.exports = router;