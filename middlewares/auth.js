const passport = require("passport");

const authMiddleware = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (error, user) => {
		if (!user || error) {
			return res.status(401).json({ message: "Not authorized" });
		}
		req.user = user;
		next();
	})(req, res, next);
};

module.exports = authMiddleware;