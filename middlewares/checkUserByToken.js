const { catchAsync, HttpError } = require("../helpers");
const { jwtService, userService } = require("../service");

const checkUserByToken = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
    const id = await jwtService.checkToken(token);
    const user = await userService.findUserByFilter({ _id: id });
    if (!user || token !== user.token) throw new HttpError(401, 'Not authorized');
    req.user = user;
    next()
})

module.exports = checkUserByToken