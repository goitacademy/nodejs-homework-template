const { Types } = require('mongoose');

const { catchAsync, HttpError, userValidator } = require('../utils');
const contacts = require('../models/contactsModel');

exports.checkUserId = catchAsync(async (req, res, next) => {
	const { contactId } = req.params;
	const idIsValid = Types.ObjectId.isValid(contactId);

	if (!idIsValid) throw new HttpError(404, 'User not found..');

	const userExists = await contacts.exists({ _id: contactId });
	// const userExists = await User.findById(id);

	if (!userExists) throw new HttpError(404, 'User not found..');

	next();
});

exports.checkCreateUserData = catchAsync(async (req, res, next) => {
	const { value, error } = userValidator.createUserDataValidator(req.body);

	if (error) throw new HttpError(400, 'Invalid user data!');

	const userExists = await contacts.exists({ email: value.email });

	if (userExists) throw new HttpError(409, 'User with this email already exists..');

	req.body = value;

	next();
});


