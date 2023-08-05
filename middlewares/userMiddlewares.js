const {catchAsync} = require('../utils/catchAsync')
const { verifyToken } = require('../services/jwtToken')
const  AppError  = require('../utils/appError');
const { getUserById } = require('../controllers/userControler');

exports.protect = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];
    const userId = verifyToken(token)

    const currentUser = await getUserById(userId)
    if (!currentUser) throw new AppError(401, "Not authorized"); 

    req.user = currentUser;

    next();
})