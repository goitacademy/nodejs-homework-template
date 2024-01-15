const { userServise } = require('../servises');
const { catchAsync } = require('../utils');

const registerUser = catchAsync(async (req, res) => {
	const { user } = await userServise.registerUser(req.body);

	res.status(201).json({
		mes: 'Created',
		user: {
			email: user.email,
			subscription: user.subscription || 'started',
			avatar: user.avatar,
		},
	})
});


const loginUser = catchAsync(async (req, res) => {
	const { user, token } = await userServise.loginUser(req.body);

	res.status(200).json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription || 'started',
		}
	})

});

const logOut = async (req, res) => {
	const { _id } = req.user;
	await userServise.getsignOutUser(_id);

	res.status(204).json({
		message: 'Logout success',
	});
};


const getMy = (req, res) => {
	res.status(200).json({
		email: req.user.email,
		subscription: req.user.subscription,
	})
}


const updateSub = (req, res) => {
	const { subscription } = req.body;
	const { _id } = req.user

	userServise.updateSubscription(_id, subscription);
	res.status(200).json({
		email: req.user.email,
		subscription: subscription,
	})
}


const updateAvatar = catchAsync(async (req, res) => {
	const updateUser = await userServise.updateMe(req.body, req.user, req.file);

	res.status(200).json({
		'massage': 'success',
		'avatarURL': updateUser.avatar,
	})
})


const updateMyPassword = catchAsync(async (req, res) => {
	res.status(200).json({
		user: req.user,
	})
})


const forgotPassword = catchAsync(async (req, res) => {
	res.status(200).json({
		user: req.user,
	})
})

const resetPassword = catchAsync(async (req, res) => {
	res.status(200).json({
		user: req.user,
	})
})







module.exports = {
	registerUser,
	loginUser,
	getMy,
	logOut,
	updateSub,
	updateAvatar,
	updateMyPassword,
	forgotPassword,
	resetPassword,
}