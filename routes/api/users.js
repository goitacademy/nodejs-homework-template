const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares");
const { User } = require("../../models/user");

router.get("/current", authenticate, async (req, res, next) => {
	res.json({
		email: req.user.email,
		subscription: req.user.subscription,
	});
});

router.get("/logout", authenticate, async (req, res, next) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });
	res.status(204).send();
});

module.exports = router;
