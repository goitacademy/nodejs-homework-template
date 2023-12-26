const { catchAsync, HttpError } = require("../helpers");
const { userService } = require("../service");

exports.checkLoginData = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userService.findUserByFilter({email}).select('+password')
    if (!user) throw new HttpError(401, 'Email or password is wrong');
    const pswdIsValid = await user.checkPswd(password, user.password);
    if (!pswdIsValid) throw new HttpError(401, 'Email or password is wrong');
    req.user = user
    next()
})