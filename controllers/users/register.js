const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const { Conflict } = require("http-errors");
const { User } = require("../../models");

const register = async (req, res) => {
	const { email, password, subscription } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw new Conflict(`Email ${email} in use already`);
	}

	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const avatarURL = gravatar.url(email);

	const result = await User.create({
		email,
		password: hashPassword,
		subscription,
		avatarURL,
	});

	res.status(200).json({
		status: "success",
		code: 201,
		user: {
			email,
			subscription: result.subscription,
			avatarURL,
		},
	});
};

module.exports = register;
