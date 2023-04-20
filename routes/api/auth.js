const router = require("express").Router();
const { bodyValidator, authenticate, updateStatus } = require("../../middlewares");
const { schemas } = require("../../models/userSchema");

const {
	createUser,
	userLogin,
	getCurrent,
	logout,
	updateSubscription,
} = require("../../controllers/auth");
// Signup
router.post("/register", bodyValidator(schemas.userCreateSchema), createUser);
// Login
router.post("/login", bodyValidator(schemas.userLoginSchema), userLogin);
//  Current User
router.get("/current", authenticate, getCurrent);
// Logout
router.post("/logout", authenticate, logout);
// Update Subscription
router.patch(
	"/",
	authenticate,
	updateStatus(schemas.updateSubscriptionSchema, "subscription"),
	updateSubscription,
);

module.exports = router;
