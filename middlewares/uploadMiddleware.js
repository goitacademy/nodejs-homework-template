
// const multer = require("multer");
// const path = require("path");

// const uuid = require('uuid').v4;

// const { AppError} = require('../helpers/errors');

// const tempDir = path.join(__dirname, "../", "temp");


const { ImageService } = require('../services/imageService');


// const multerStorage = multer.diskStorage({
//     destination: (req, file, cbk) => {
//         cbk(null, tempDir)
//     },
//     filename: (req, file, cbk) => {
//         const ext = file.mimetype.split('/')[1];
//         cbk(null, `${req.user.id}-${uuid()}.${ext}`)
//     }
// })
// const multerFilter = (req, file, cbk) => { 
//     if (file.mimetype.startsWith('image')) {
//         cbk(null,true)
//     } else {
//         cbk(new AppError(400, 'Please upolad images only..'), false);
//     }
// }

// exports.uploadMiddleware = multer({
//     storage: multerStorage,
//     fileFilter: multerFilter
// }).single('avatar');


exports.uploadUserPhoto = ImageService.upload('avatar');