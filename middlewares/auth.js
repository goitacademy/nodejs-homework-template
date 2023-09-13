const passport = require("passport");

module.exports = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user) => {
		if (!user || err) {
			return res.status(401).json({
				status: "error",
				message: "Not authorized",
			});
		}
		req.user = user;
		next();
	})(req, res, next);
};
