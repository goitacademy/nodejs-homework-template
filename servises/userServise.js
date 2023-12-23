const Users = require('../models/userModel');
const { HttpError } = require('../utils');
// const { catchAsync } = require('../utils');
// const bcrypt = require('bcrypt');


exports.registerUser = async (userData) => {
	const newUser = await Users.create(userData);
	newUser.password = undefined;

	return newUser;
}


exports.checkContactExist = async (status) => {
	const userExists = await Users.exists(status);

	if (userExists) throw new HttpError(409, 'User Exists');
}
// 	const { password, email, subscription, ...body } = req.body;
// 	const passwordHash = await bcrypt.hash(password, 10);

// 	await Users.create({
// 		password: passwordHash,
// 		email,
// 		subscription,
// 		...body,
// 	})

// 	res.status(201).json({
// 		mes: 'Created',
// 		user: {
// 			email,
// 			subscription: subscription,
// 		},
// 	})
// };




// const LogInUser = catchAsync(async (req, res, next) => {
// 	const { password, email, ...all } = req.body;
// 	const salt = bcrypt.genSalt(10);
// 	const passwordHash = bcrypt.hash(password, salt);
// 	await Users.create({
// 		password: passwordHash,
// 		email,
// 		...all,
// 	})
// 	console.log(passwordHash);
// 	res.status(201).json({
// 		mes: 'Created',
// 		user: {
// 			email,
// 			subscription: 'started',
// 		},
// 	})
// })

