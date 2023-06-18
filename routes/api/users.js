const express = require("express");
const router = express.Router();
const User = require("../../service/schemas/userSchema");
const { registerValidation, loginValidation } = require("../../service/schemas/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const auth = require("../../service/token");

// Register
router.post("/signup", async (req, res) => {
	const { email, password } = req.body;

	// Validation
	const { error } = registerValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Does email exist
	const user = await User.findOne({ email });
	if (user) {
		return res.status(409).json({
			status: "error",
			code: 409,
			message: "Email is already in use",
		});
	}
	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Register logic
	try {
		const newUser = new User({ email, password: hashedPassword });
		await newUser.save();
		res.status(201).json({
			status: "success",
			code: 201,
			user: {
				email: email,
				id: newUser._id,
			},
			message: "Registration successful",
		});
	} catch (err) {
		console.error(err);
	}
});

// Login
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	// Validation
	const { error } = loginValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Does user exist
	const userExist = await User.findOne({ email });
	if (!userExist) {
		return res.status(401).json({
			status: "error",
			code: 401,
			message: "Email or password is wrong",
		});
	}

	// Valid password
	const validPassword = await bcrypt.compare(password, userExist.password);
	if (!validPassword) {
		return res.status(401).json({
			status: "error",
			code: 401,
			message: "Email or password is wrong",
		});
	}

	// Login logic
	const token = jwt.sign({ _id: userExist._id }, secret, { expiresIn: "1h" });
	res.header("Bearer", token);

	try {
		res.status(200).json({
			status: "success",
			code: 200,
			user: {
				email: email,
			},
			message: "Login successful",
		});
	} catch (err) {
		console.error(err);
	}
});

// Logout
router.get("/logout", auth, async (req, res) => {
	const { _id } = req.user;
	const findUser = await User.findById({ _id });

	if (!findUser) {
		return res.status(401).json({
			status: "error",
			code: 401,
			message: "Unauthorized access",
		});
	}

	// Logout logic
	try {
		res.header("Bearer", "").status(204).json({
			status: "success",
			code: 204,
		});
	} catch (err) {
		console.log(err);
	}
});

// Current user
router.get("/current", auth, async (req, res, next) => {
	const { _id } = req.user;
	const currentUser = await User.findById({ _id });

	// Current logic
	try {
		res.status(200).json({
			status: "success",
			code: 200,
			data: {
				email: currentUser.email,
			},
		});
	} catch (err) {
		res.status(401).json({
			status: "error",
			code: 401,
			message: "Unauthorized access",
		});
	}
});

module.exports = router;
