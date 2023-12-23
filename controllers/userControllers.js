const { userServise } = require('../servises');
const { catchAsync } = require('../utils');

const registerUser = catchAsync(async (req, res) => {
	const { email, subscription } = req.body;
	await userServise.registerUser(req.body);

	res.status(201).json({
		mes: 'Created',
		user: {
			email,
			subscription: subscription || 'started',
		},
	})
});




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


module.exports = {
	registerUser,
	// LogInUser,
}