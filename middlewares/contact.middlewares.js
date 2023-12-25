
const { catchAsync, HttpError } = require('../utils');
const { contactServise } = require('../servises');
const { contactValidator } = require('../utils/validators');



exports.checkUserId = catchAsync(async (req, res, next) => {
	const { contactId } = req.params;
	await contactServise.checkUserbyId(contactId);

	next();
});


exports.checkupdateUserDatafavorite = catchAsync(async (req, res, next) => {
	const { value, error } = contactValidator.updateUserDataValidatorfavorite(req.body);

	if (error) throw new HttpError(400, 'missing field favorite', error);

	await contactServise.userFavorite({ favorite: value.favorite });

	req.body = value;

	next();
});


exports.checkCreateUserData = catchAsync(async (req, res, next) => {
	const { value, error } = contactValidator.createUserDataValidator(req.body);

	if (error) throw new HttpError(400, 'Invalid user data!', error);

	await contactServise.checkContactExist({ email: value.email });

	req.body = value;

	next();
});


exports.checkUpdateUserData = catchAsync(async (req, res, next) => {
	const { value, error } = contactValidator.updateUserDataValidator(req.body);

	if (error) throw new HttpError(400, 'Invalid user data!', error);

	await contactServise.checkContactExist({ email: value.email, _id: { $ne: req.params.id } });

	req.body = value;

	next();
});


