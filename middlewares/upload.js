import multer from "multer";
import path from "path";
import { HttpError } from "../helpers/index.js";
import dotenv from "dotenv";
import Jimp from "jimp";

dotenv.config();

const destination = path.resolve("temp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        const filenameResized = Jimp.read("temp", (err, filename) => {
            if (err) throw err;
            filename.resize(250, 250)
        });
        cb(null, filename);
    }
});

/*
Jimp.read("lenna.png", (err, lenna) => {
  if (err) throw err;
  lenna
    .resize(256, 256) // resize

});*/


const limits = {
    fileSize: 5 * 1024 * 1024,
};


const fileFilter = (req, file, cb) => {
    const extention = file.originalname.split(".").pop();
    if (extention === "exe") {
        return cb(HttpError(400, "Invalid file extention"));
    }
    cb(null, true);
};

const upload = multer({
    storage,
    limits,
    //fileFilter,
});

export default upload;
