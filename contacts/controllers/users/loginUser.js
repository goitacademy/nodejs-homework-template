const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../../models/user");
const { HttpError } = require("../../../helpers");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401);
	}

	const passwordCompare = await bcrypt.compare(password, user.password);

	if (!passwordCompare) {
		throw HttpError(401);
	}

	const payload = { id: user._id };
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "9h" });

	const result = await User.findOneAndUpdate(
		{ email },
		{ token },
		{ new: true }
	);

	res.json({
		token: result.token,
		user: {
			email: result.email,
			subscription: result.subscription,
		},
	});
};

module.exports = loginUser;