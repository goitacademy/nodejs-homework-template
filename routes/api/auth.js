const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { registerLoginSchema } = require("../../models/user");

const router = express.Router();

const { schemas } = require("../../models/contact");

router.post("/register", validateBody(registerLoginSchema), ctrl.register);

router.post("/login", validateBody(registerLoginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
	"/:id/subscription",
	authenticate,
	validateBody(schemas.updateSubscriptionSchema),
	ctrl.updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
