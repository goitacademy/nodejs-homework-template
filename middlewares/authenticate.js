const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const HttpError = require("../helpers")
const ctrlWrapper = require("../decorators")

const authenticate = async (req, res) => {
	const { autorization } = req.headers;
	const [bearer, token] = autorization.split(" ");

	if(bearer !== "Bearer") throw HttpError(401)
};

module.exports = ctrlWrapper(authenticate);