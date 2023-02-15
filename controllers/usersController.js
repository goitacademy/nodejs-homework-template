const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User, schemas } = require("../models/users");

const { SECRET_KEY } = process.env;

const listCurrent = async (req, res) => {
	const { name, email, subscription } = req.user;
	res.json({
		name,
		email,
		subscription,
	});
};

const login = async (req, res) => {
	const { error } = schemas.login.validate(req.body);
	if (error) {
		res.status(400).json({ message: "Incorrect format of entered data " });
		return;
	}
	const { email, password, subscription } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.status(401).json({ message: "Incorrect email or password" });
		return;
	}
	const comparePassword = await bcrypt.compare(password, user.password);
	if (!comparePassword) {
		res.status(401).json({ message: "Incorrect email or password" });
		return;
	}
	const payload = {
		id: user._id,
	};
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
	await User.findByIdAndUpdate(user._id, { token });
	res.json({
		token,
		user: {
			email,
			subscription,
		},
	});
};

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });
	res.status(204).send();
};

const register = async (req, res) => {
	const { error } = schemas.register.validate(req.body);
	if (error) {
		res.status(400).json({ message: "Incorrect format of entered data" });
		return;
	}
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		res.status(409).json({ message: "User with this email already exists" });
		return;
	}
	try {
		const hashPassword = await bcrypt.hash(password, 10);
		const result = await User.create({ ...req.body, password: hashPassword });

		res.status(201).json({
			user: {
				name: result.name,
				email: result.email,
				subscription: result.subscription,
			},
		});
	} catch (e) {
		next(e);
	}
};

module.exports = {
	listCurrent,
	login,
	logout,
	register,
};
