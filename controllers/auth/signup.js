const { User, signupSchema } = require("../../models/user");
const { RequestError } = require("../../utils");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
	try {
		const { error } = signupSchema.validate(req.body);
		if (error) throw RequestError(400, error.message);
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (user) throw RequestError(409, "Email in use");
		const hashPassword = await bcrypt.hash(password, 10);
		console.log("debuging1...");
		// const hashPassword = "147852";
		console.log("hashPassword", hashPassword);
		const result = await User.create({ ...req.body, password: hashPassword });
		res.status(201).json({
			user: {
				email: result.email,
				subscription: result.subscription,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = signup;
