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
	const { value, error } = userValidator.userRegistrationValidator(req.body);
	if (error) throw new HttpError(401, 'Not authorized', error);

	req.body = value;
	next();
};


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



// const multyStorage = multer.diskStorage({
// 	destination: (req, file, cbk) => {
// 		cbk(null, 'public/avatar');
// 	},
// 	filename: (req, file, cbk) => {
// 		const extension = file.mimetype.split('/')[1];
// 		cbk(null, `${req.user._id}-${uuid()}.${extension}`)
// 	}
// });

// const multyFilter = (req, file, cbk) => {
// 	if (file.mimetype.startsWith('image/')) {
// 		cbk(null, true);
// 	} else {
// 		cbk(new HttpError(400, 'Please upload images only.'), false);
// 	}
// };


// exports.uploadAvatar = multer({
// 	storage: multyStorage,
// 	fileFilter: multyFilter,
// 	limits: {
// 		fileSize: 5 * 1024 * 1024,
// 	}
// }).single('avatar');

exports.uploadAvatar = ImageService.InitUploadImage('avatar');