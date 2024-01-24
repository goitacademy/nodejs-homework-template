// const { Types } = require('mongoose');

const { catchAsync, HttpError } = require('../utils');
const { userValidator } = require('../utils/validators');
const { userServise, jwtServise, ImageService } = require('../servises');

exports.checkRegistrations = catchAsync(async (req, res, next) => {
	const { value, error } = userValidator.userRegistrationValidator(req.body);
	if (error) throw new HttpError(400, 'Invalid user data!....', error);

	await userServise.checkContactExist({ email: value.email });

	req.body = value;
	next();
});


exports.checkLoginUserData = (req, res, next) => {

	const isEmpty = Object.keys(req.body).length === 0;
	if (isEmpty) throw new HttpError(400, 'Invalid user data!....');

	const { value, error } = userValidator.userRegistrationValidator(req.body);

	if (!value.email || !value.password) throw new HttpError(400, 'Invalid user data!....');
	if (error) throw new HttpError(401, 'Not authorized', error);

	req.body = value;

	next();
};

exports.checkSubscription = catchAsync(async (req, res, next) => {
	const isEmpty = Object.keys(req.body).length === 0;
	if (isEmpty) throw new HttpError(400, 'Invalid subscription data!....');

	const { value, error } = userValidator.subscriptionValidator(req.body);
	if (error) throw new HttpError(401, 'Invalid subscription data!....', error);

	req.body = value;
	next();
});

exports.protect = catchAsync(async (req, res, next) => {
	const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
	const userId = jwtServise.checkToken(token);

	if (!userId) throw new HttpError(401, 'Not authorized');

	const currentUser = await userServise.getOneUser(userId);
	currentUser.password = undefined;
	if (!currentUser) throw new HttpError(401, 'Not authorized');

	req.user = currentUser;
	next();
});


exports.checkUpdateMyPassword = catchAsync(async (req, res, next) => {
	const { currentPassword, newPassword } = req.body;

	const { value, error } = userValidator.userNewPasswordValidator({ newPassword: newPassword });
	if (error) throw new HttpError(401, 'Invalid new password!....', error);

	req.body.newPassword = value;

	await userServise.checkUserPassword(req.user._id, currentPassword, newPassword);
	next();
});


exports.checkUserEmail = catchAsync(async (req, res, next) => {
	const { email } = req.body;

	const { value, error } = userValidator.userEmailValidator({ email });
	if (error) throw new HttpError(400, 'Invalid email', error);

	req.body = value;

	next();
});


exports.checkNewPassword = catchAsync(async (req, res, next) => {
	const { password } = req.body;

	const { value, error } = userValidator.userPassvordValidator({ password });
	if (error) throw new HttpError(400, 'Invalid subscription data!....');

	req.body = value;

	next();
});




exports.uploadAvatar = ImageService.InitUploadImage('avatar');