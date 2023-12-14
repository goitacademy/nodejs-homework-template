import multer from "multer";
import path from "path";

import { HttpError } from "../helpers/index.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const extension = file.originalname.split(".")[1];
        const uniqueId = Data.new() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueId + "." + extension);
    },
});

const limits = {
    fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
    const extension = file.mimetype;
    if (extension !== "image/jpeg" && extension !== "image/png") {
        return cb(
            HttpError(415, "File extension must be 'image/jpeg' or 'image/png'")
        );
    }
    return cb(null, true);
}

const upload = multer({ storage, limits, fileFilter });

export default upload
