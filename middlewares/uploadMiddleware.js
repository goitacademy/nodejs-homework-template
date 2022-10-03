const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./tmp'));
    },
    filename: (req, file, cb) => {
        const { _id } = req.user;
        const [, extention] = file.originalname.split('.');
        cb(null, `${_id}.${extention}`);
        req.urlTmp = path.resolve('./tmp/', `${_id}.${extention}`);
    }
});

const uploadMiddleware = multer({ storage }).single('avatar');

module.exports = {
    uploadMiddleware
}