
const { catchAsync, HttpError } = require('../utils');
const { contactServise } = require('../servises');
const { contactValidator } = require('../utils/validators');



exports.checkContactId = catchAsync(async (req, res, next) => {
	const { contactId } = req.params;
	await contactServise.checkContactbyId(contactId);

	next();
});

exports.checkContactIdisValid = catchAsync(async (req, res, next) => {
	const { contactId } = req.params;
	await contactServise.checkContactIdIsValid(contactId);

	next();
});


exports.checkupdateContactDatafavorite = catchAsync(async (req, res, next) => {
	const { value, error } = contactValidator.updateContactDataValidatorfavorite(req.body);

	if (error) throw new HttpError(400, 'missing field favorite', error);

	req.body = value;

	next();
});


exports.checkCreateUserData = catchAsync(async (req, res, next) => {
	const { value, error } = contactValidator.createContactDataValidator(req.body);

	if (error) throw new HttpError(400, 'Invalid user data!', error);


	req.body = value;

	next();
});


exports.checkUpdateUserData = catchAsync(async (req, res, next) => {
	const isEmpty = Object.keys(req.body).length === 0;
	if (isEmpty) throw new HttpError(400, 'Invalid user data!');

	const { value, error } = contactValidator.updateContactDataValidator(req.body);

	if (error) throw new HttpError(400, 'Invalid user data!', error);

	await contactServise.checkContactExist({ email: value.email, _id: { $ne: req.params.id } });

	req.body = value;

	next();
});


