const multer = require('multer')

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

const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback( null, 'public/tmp')
    },
    filename: (req, file, callback) => {
        const imageExtension = file.mimetype.split('/')[1]

        callback(null, `${req.user.id}_${Date.now()}.${imageExtension}`)
    },
})

const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
        callback(null, true)
    } else {
        callback(new AppError(400, 'ivalid formt file'), false);
    }
}


exports.uploutPhotoMiddlewares =  multer({
    storage: multerStorage,
    fileFilter: multerFilter,
}).single('avatar')

