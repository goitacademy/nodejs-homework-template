const { catchAsync, HttpError } = require('../helpers');
const { userService, jwtService, ImageService } = require('../service');

exports.checkLoginData = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userService.findUserByFilter({ email }).select('+password');
    if (!user) throw new HttpError(401, 'Email or password is wrong');
    const pswdIsValid = await user.checkPswd(password, user.password);
    if (!pswdIsValid) throw new HttpError(401, 'Email or password is wrong');
    req.user = user;
    next();
});

exports.checkUserByToken = catchAsync(async (req, res, next) => {
    const token =
        req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
    const id = await jwtService.checkToken(token);
    const user = await userService.findUserByFilter({ _id: id });
    if (!user || token !== user.token) throw new HttpError(401, 'Not authorized');
    req.user = user;
    next();
});

exports.uploadAvatar = ImageService.initUploadImageMiddleware('avatar')