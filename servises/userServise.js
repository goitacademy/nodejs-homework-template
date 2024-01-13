const { registerToken } = require('./jwtServise');
const Users = require('../models/userModel');
const { HttpError } = require('../utils');
const ImageService = require('./imageServise');




exports.registerUser = async (userData) => {
	const newUser = await Users.create(userData);
	newUser.password = undefined;
	const token = registerToken(newUser._id);
	await Users.findByIdAndUpdate(newUser._id, { token });
	return {
		user: newUser,
		token: newUser.token,
	}
}


exports.loginUser = async (userData) => {

	const user = await Users.findOne({ email: userData.email }).select('+password');
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
	// console.log(user.avatar);
	// console.log(userData);
	// console.log(user);


	Object.keys(userData).forEach((key) => {
		user[key] = userData[key];
	});

	return await Users.findByIdAndUpdate(user.id, { avatar: user.avatar }, { new: true });
};