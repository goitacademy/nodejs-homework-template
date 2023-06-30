const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
	const { authorization = "" } = req.headers;
	const [bearer, token] = authorization.split(" ");
	if (bearer !== "Bearer") {
		next(HttpError(401));
	}
	try {
		const { id } = jwt.verify(token, SECRET_KEY);
		const user = await User.findById(id);
		if (!user || !user.token || user.token !== token) {
			next(HttpError(401, "Not authorized"));
		}
		req.user = user;
		next();
	} catch {
		next(HttpError(401));
	}
};

module.exports = authenticate;

// перевірка користувача чи він логінувався   authenticate
// const { id } = jwt.verify(token, SECRET_KEY);
//                token === validtoken  SECRET_KEY

// перевірка користувача чи він є у базі
// const user = await User.findById(id);

// якщо перевірка успішна тоді викликаємо   next()
