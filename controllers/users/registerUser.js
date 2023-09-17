const bcrypt = require("bcrypt");
const gravatar = require("gravatar");


const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const registerUser = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409);
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email, { protocol: "https" });

	const newUser = await User.create({ email, password: hashPassword, avatarURL, });

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

module.exports = registerUser;