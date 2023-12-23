
const { catchAsync, HttpError, contactValidator } = require('../utils');
const { contactServise } = require('../servises');



exports.checkUserId = catchAsync(async (req, res, next) => {
	const { contactId } = req.params;
	await contactServise.checkUserbyId(contactId);

	next();
});


exports.checkupdateUserDatafavorite = catchAsync(async (req, res, next) => {
	const { value, error } = contactValidator.updateUserDataValidatorfavorite(req.body);

	if (error) throw new HttpError(400, 'missing field favorite');

	await contactServise.userFavorite({ favorite: value.favorite });

	req.body = value;

	next();
});


exports.checkCreateUserData = catchAsync(async (req, res, next) => {
	const { value, error } = contactValidator.createUserDataValidator(req.body);

	if (error) throw new HttpError(400, 'Invalid user data!');

	await contactServise.checkContactExist({ email: value.email });

	req.body = value;

	next();
});


exports.checkUpdateUserData = catchAsync(async (req, res, next) => {
	const { value, error } = contactValidator.updateUserDataValidator(req.body);

	if (error) throw new HttpError(400, 'Invalid user data!');

	await contactServise.checkContactExist({ email: value.email, _id: { $ne: req.params.id } });

	req.body = value;

	next();
});


