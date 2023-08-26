const Joi = require("joi");
const userService = require("../services/users.service");

const userSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

const registerUser = async (req, res, next) => {
	try {
		const user = await userService.getUserByEmial(req.body.email);
		if (user) {
			return res.status(409).json({
				status: "fail",
				code: 409,
				message: "Email in use",
			});
		}

		const validateRegister = userSchema.validate(req.body);
		if (validateRegister.error) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid data",
				error: validateRegister.error,
			});
		}

		const newUser = await userService.register(req.body);
		res.status(201).json({
			status: "success",
			code: 201,
			data: {
				newUser,
			},
		});
	} catch (error) {
		next(error);
	}
};

const loginUser = async (req, res, next) => {
	try {
		const user = await userService.login(req.body);

		const validateRegister = userSchema.validate(req.body);
		if (validateRegister.error) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid data",
				error: validateRegister.error,
			});
		}

		if (user) {
			res.json({
				status: "success",
				code: 200,
				data: { user },
			});
		} else {
			res.status(400).json({
				status: "fail",
				code: 400,
				message: "Incorrect login or password",
			});
		}
	} catch (error) {
		next(error);
	}
};

const logoutUser = async (req, res, next) => {
	try {
		await userService.logout(req.params.id);
		res.json({
			status: "success",
			code: 200,
			message: "User logged out",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
};
