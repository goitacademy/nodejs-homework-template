// const { Types } = require('mongoose');

const { catchAsync, HttpError, userValidator } = require('../utils');
const { userServise } = require('../servises');

exports.checkRegistrations = catchAsync(async (req, res, next) => {
	const { value, error } = userValidator.userRegistrationValidator(req.body);
	if (error) throw new HttpError(400, 'Invalid user data!....');

	await userServise.checkContactExist({ email: value.email });

	req.body = value;
	next();
});