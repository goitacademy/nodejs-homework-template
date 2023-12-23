const Users = require('../models/userModel');
const { catchAsync } = require('../utils');
const bcrypt = require('bcrypt');


const registerUser = catchAsync(async (req, res) => {
	const { password, email, subscription } = req.body;
	// const salt = bcrypt.genSalt(10);
	// const passwordHash = bcrypt.hash(password, salt);
	await Users.create({
		password,
		// password: passwordHash,
		email,
		subscription,
	})
	// console.log(passwordHash);
	res.status(201).json({
		mes: 'Created',
		user: {
			email,
			subscription: 'started',
		},
	})
});

const addContact = catchAsync(async (req, res) => {

	const newContact = await Users.create(req.body);

	res.status(201).json({
		mes: 'Success',
		newContact,
	})
})


const LogInUser = catchAsync(async (req, res, next) => {
	const { password, email, ...all } = req.body;
	const salt = bcrypt.genSalt(10);
	const passwordHash = bcrypt.hash(password, salt);
	await Users.create({
		password: passwordHash,
		email,
		...all,
	})
	console.log(passwordHash);
	res.status(201).json({
		mes: 'Created',
		user: {
			email,
			subscription: 'started',
		},
	})
})


module.exports = {
	registerUser,
	LogInUser,
	addContact,
}