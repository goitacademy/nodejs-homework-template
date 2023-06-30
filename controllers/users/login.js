const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const { SECRET_KEY } = process.env;

const { User } = require("../../models/user");

const { ctrlWrapper, HttpError } = require("../../helpers");

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	const passwordCompare = await bcrypt.compare(password, user.password);
	// перевіряємо паролі, який ввели з тим, який є, чи співпадають
	if (!user || !passwordCompare) {
		throw HttpError(401, "Email or password invalid");
	}

	const payload = {
		id: user._id,
	};

	// час життя токену   expiresIn: "23h"
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
	});
};

module.exports = {
	login: ctrlWrapper(login),
};
