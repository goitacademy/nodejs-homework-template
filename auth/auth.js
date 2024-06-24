const passport = require("passport");

const auth = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	passport.authenticate("jwt", { session: false }, (err, user) => {
		if (err || !user || !user.token || user.token !== token) {
			return res.status(401).json({
				status: "fail",
				code: 401,
				message: "Not authorized",
			});
		}
		req.user = user;
		next();
	})(req, res, next);
};

module.exports = auth;