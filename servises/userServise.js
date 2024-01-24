const { registerToken } = require('./jwtServise');
const Users = require('../models/userModel');
const { HttpError } = require('../utils');
const ImageService = require('./imageServise');
// const crypto = require('crypto');





exports.registerUser = async (userData) => {
	const User = await Users.create(userData);
	User.password = undefined;
	const token = registerToken(User._id);
	const otp = User.createVerificationToken();
	await Users.findByIdAndUpdate(User._id, { token, verificationToken: otp });

	return {
		user: User,
		token: User.token,
		otp,
	}
}

exports.verificationUser = async (otp) => {
	const user = await Users.findOne({
		verificationToken: otp,
	});

	if (!user) throw new HttpError(404, 'User not found');

	user.verify = true;
	user.verificationToken = null;

	await user.save();
}


exports.SendNewToken = async (user) => {
	if (user.verify === true) throw new HttpError(400, 'Verification has already been passed');
	const otp = user.createVerificationToken();
	await Users.findOneAndUpdate({ email: user.email }, { verificationToken: otp });

	return {
		otp,
	}

}



exports.loginUser = async (userData) => {

	const user = await Users.findOne({ email: userData.email, verify: true }).select('+password');
	if (!user) throw new HttpError(401, 'Email or password is wrong');

	const passwordisValid = await user.checkPassword(userData.password, user.password);

	if (!passwordisValid) throw new HttpError(401, 'Email or password is wrong');
	user.password = undefined;
	const token = registerToken(user._id);
	await Users.findByIdAndUpdate(user._id, { token });
	return {
		user,
		token: user.token,
	}
};

exports.getOneUser = (id) => Users.findById(id);

exports.getUserByEmail = (email) => Users.findOne({ email });


exports.getsignOutUser = async (id) => await Users.findByIdAndUpdate(id, { token: '' });


exports.updateSubscription = async (id, subscriptionUpd) => {
	return await Users.findByIdAndUpdate(id, { subscription: subscriptionUpd }, { new: true });
}

exports.checkContactExist = async (status) => {
	const userExists = await Users.exists(status);
	if (userExists) throw new HttpError(409, 'User Exists');
}

exports.updateMe = async (userData, user, file) => {
	if (file) {
		user.avatar = await ImageService.saveImage(
			file,
			{ maxFileSize: 1.2, width: 250, height: 250 },
			'avatar',
			'users',
			user.id,
		);
	}


	Object.keys(userData).forEach((key) => {
		user[key] = userData[key];
	});

	return await Users.findByIdAndUpdate(user.id, { avatar: user.avatar }, { new: true });
};


exports.checkUserPassword = async (userId, currentPassword, newPassword) => {

	const currentUser = await Users.findById(userId).select('+password');

	if (!(await currentUser.checkPassword(currentPassword, currentUser.password)))
		throw new HttpError(401, 'Current password invalid');

	const passwdHash = await currentUser.newPassword(newPassword);
	// console.log(passwdHash);
	await Users.findByIdAndUpdate(userId, { password: passwdHash }, { new: true });

}

exports.resetPassword = async (otp, newPassword) => {


	const user = await Users.findOne({
		passwordResetToken: otp,
		passwordResetTokenExp: { $gt: Date.now() },
	});

	if (!user) throw new HttpError(400, 'Token is not valid');

	user.password = newPassword;
	user.passwordResetToken = undefined;
	user.passwordResetTokenExp = undefined;

	await user.save();
}