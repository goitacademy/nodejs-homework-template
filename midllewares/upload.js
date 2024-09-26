import multer from "multer";
import path from 'path';




const destination = path.resolve("temp")
// console.log(destination);
const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        // cb(null, file.originalname)

        const uniquePreffix = `${Date.now()}_ ${Math.random() * 1E9}`;
        const filename = `${uniquePreffix}_ ${file.originalname}`;
        cb(null, filename);

    }
})


const limits = {
    fileSize: 5 * 1024 * 1024,
};
const upload = multer({
    storage,
    limits
})
    


export default upload;