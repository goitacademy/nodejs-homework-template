import multer from "multer";
import path from "path";


const destination = path.resolve("tmp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniqPref = `${Date.now()} - ${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniqPref}_${file.originalname}`;
        cb(null, filename);
    },
});

const limits = {
    faleSize: 1024 * 1024 * 5,
};

const upload = multer({
    storage,
    limits,
});

export default upload;