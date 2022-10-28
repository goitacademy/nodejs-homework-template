const { RequestError } = require("../utils");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const [bearer, token] = authorization.split(" ");
		if (bearer !== "Bearer" && token) throw RequestError(401);
		const { id } = jwt.verify(token, SECRET_KEY);
		req.userId = id;
		next();
	} catch (error) {
		if (!error.status) {
			error.status = 401;
			error.message = "Unauthorized";
		}
		next(error);
	}
};

module.exports = authenticate;
