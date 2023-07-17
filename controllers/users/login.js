const { User } = require('../../models');
const { requestError } = require('../../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw requestError(401, 'Email or password is wrong');
	}

	const isValidPassword = await bcrypt.compare(password, user.password);

	if (!isValidPassword) {
		throw requestError(401, 'Email or password is wrong');
	}

	const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

	user.token = token;

	await User.findByIdAndUpdate(user._id, user);

	res.json({ token, user: { email, subscription: user.subscription } });
};

module.exports = login;
