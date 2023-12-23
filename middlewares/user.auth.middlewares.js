// const { Types } = require('mongoose');

const { catchAsync, HttpError, userValidator } = require('../utils');
const { users } = require('../models');

exports.checkRegistrations = catchAsync(async (req, res, next) => {
	const { value, error } = userValidator.userRegistrationValidator(req.body);
	if (error) throw new HttpError(400, 'Invalid user data!....');

	const userExists = await users.exists({ email: value.email });

	if (userExists) throw new HttpError(409, 'Email in use');

	req.body = value;
	console.log(value);
	next();
});