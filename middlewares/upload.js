import multer from "multer";
import path from 'path'

const destination = path.resolve('temp');

const storage = multer.diskStorage({
    destination,
    filename: (reg, file, cb) => {
        const uniquePrefix = `_${Math.round(Math.random() * 1E9)}`
        const filename = `${uniquePrefix}_${file.originalname}`;
        cb(null, filename);
    }
})

const limits = {
    fileSize: 1024 * 1024 * 50,
}

const filterFile = (req, file, cb) => {
    if (file.originalname.split('.').pop() === 'exe') {
        cb(new Error('File extension not allow'))
    }
    cb(null, true);
}
const upload = multer({
    storage,
    limits,
    filterFile,
})

export default upload;