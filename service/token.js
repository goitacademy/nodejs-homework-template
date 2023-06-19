const jwt = require("jsonwebtoken");
const User = require("./schemas/userSchema");
const secret = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
	const token = req.header("Bearer");
	if (!token) {
		return res.status(401).json({
			status: "error",
			code: 401,
			message: "Not authorized",
		});
	}

	try {
		const verified = jwt.verify(token, secret);
		const foundUser = await User.findById(verified._id);

		if (!foundUser || foundUser.token !== token) {
			return res.status(401).json({ message: "Not authorized" });
		}
		req.user = verified;
		next();
	} catch (err) {
		res.status(401).json({
			status: "error",
			code: 401,
			message: "Not authorized",
		});
	}
};

module.exports = auth;
