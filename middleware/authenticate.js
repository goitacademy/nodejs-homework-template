const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
	try {
		const { authorization = "" } = req.headers;
		const [bearer, token] = authorization.split(" ");

		if (bearer !== "Bearer" || !token) {
			throw HttpError(401);
		}

		const { id } = jwt.verify(token, SECRET_KEY);
		const user = await User.findById(id);

		if (!user || !user.token || user.token !== token) {
			throw HttpError(401);
		}

		req.user = user;

		next();
	} catch (error) {
		if (!error.status) {
			throw HttpError(401, "Unauthorized");
		}

		next(error);
	}
};

module.exports = authenticate;
