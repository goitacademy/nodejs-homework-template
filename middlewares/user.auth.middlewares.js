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




exports.uploadAvatar = ImageService.InitUploadImage('avatar');