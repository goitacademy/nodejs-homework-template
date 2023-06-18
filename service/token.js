const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

function auth(req, res, next) {
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
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).json({
			status: "error",
			code: 400,
			message: "token error",
		});
	}
}

module.exports = auth;
