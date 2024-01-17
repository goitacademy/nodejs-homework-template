
const { userServise, Email } = require('../servises');
const { catchAsync } = require('../utils');


const registerUser = catchAsync(async (req, res) => {
	const { user, otp } = await userServise.registerUser(req.body);

	try {
		const verificationUrl = `${req.protocol}://${req.get('host')}/api/users/verify/${otp}`;

		await new Email(user, verificationUrl).sendHello();

	} catch (err) {
		console.error(err);
	}

	res.status(201).json({
		mes: 'Created',
		user: {
			email: user.email,
			subscription: user.subscription || 'started',
			avatar: user.avatar,
		},
	})
});


const verifyToken = catchAsync(async (req, res) => {
	await userServise.verificationUser(req.params.verificationToken);

	res.status(200).json({
		message: 'Verification successful',
	})
})


const repiedSendVerifyToken = catchAsync(async (req, res) => {
	const user = await userServise.getUserByEmail(req.body.email);
	const { otp } = await userServise.SendNewToken(user);

	try {
		const verificationUrl = `${req.protocol}://${req.get('host')}/api/users/verify/${otp}`;

		await new Email(user, verificationUrl).sendHello();

	} catch (err) {
		console.error(err);
	}

	res.status(200).json({
		"message": "Verification email sent"
	})
})



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
	const user = await userServise.getUserByEmail(req.body.email);

	if (!user) {
		return res.status(200).json({
			msg: 'Password reset instruction sent by email',
		});
	};

	const otp = user.createPasswordResetToken();
	console.log(otp);


	await user.save();

	try {
		const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${otp}`;

		await new Email(user, resetUrl).sendPasswdReset();

	} catch (err) {
		console.error(err);
		user.passwordResetToken = undefined;
		user.passwordResetTokenExp = undefined;
	}

	res.status(200).json({
		msg: 'Password reset instruction sent by email',
	})
})




const resetPassword = catchAsync(async (req, res) => {
	await userServise.resetPassword(req.params.otp, req.body.password)
	res.status(200).json({
		msg: 'Success',
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
	verifyToken,
	repiedSendVerifyToken,
}