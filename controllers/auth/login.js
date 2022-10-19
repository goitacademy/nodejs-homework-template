const { User, signupSchema } = require("../../models/user");
const { RequestError } = require("../../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
	try {
		const { error } = signupSchema.validate(req.body);
		if (error) throw RequestError(400, error.message);

		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || !(await bcrypt.compare(password, user.password)))
			throw RequestError(401, "Email or password is wrong");
		const payload = { id: user._id };
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
		await User.findByIdAndUpdate(user._id, { token });
		res.status(200).json({
			token,
			user: {
				email: user.email,
				subscription: user.subscription,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = login;
