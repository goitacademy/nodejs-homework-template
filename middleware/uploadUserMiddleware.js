const multer = require('multer');
const uuid = require('uuid');

const multerStorage = multer.diskStorage({
    destination : (req,file,callbackFn) => {
        callbackFn(null, 'static/img/users')
    },
    filename: (req,file, callbackFn) => {
        
        const ext = file.mimetype.split('/')[1];
        const filename = `${req.user.id}-${uuid.v4()}.${ext}`;
        console.log("File name:", filename);
        callbackFn(null, filename);
    }
})
const multerFilter = (req, file, callbackFn) => {
    console.log("Функция multerFilter вызвана");
    if (file.mimetype.startsWith('image/')) {
        callbackFn(null, true);
        return;
    }
    callbackFn(new Error("Неверный тип файла"), false);
};


const uploadUserMiddleware = multer({
    storage : multerStorage,
    fileFilter : multerFilter
}).single("avatar");

const middlewareFunction = (req, res, next) => {
    console.log("Функция промежуточного программного обеспечения вызвана");
    uploadUserMiddleware(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
};

module.exports = middlewareFunction;