import multer from "multer";
import path from "path";

import createFolderIfNotExist from "../controllers/service/createFolderIfNotExist.js";
import Jimp from "jimp";

const uploadDir = path.join(process.cwd(), "tmp");
const avatarsDir = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  // limits:
});
createFolderIfNotExist(uploadDir);
const uploadMiddleware = multer({
  storage,
});

const jimpProcess = async (req, res, next) => {
  await Jimp.read(req.file.path)
    .then((image) => {
      image
        .contain(250, 250) // resize
        .quality(100) // set JPEG quality
        .writeAsync(`${avatarsDir}/${req.user._id}.${image.getExtension()}`); // save
      const newUrl = `${avatarsDir}/${req.user._id}.${image.getExtension()}`;
      return (req.body.newUrl = newUrl);
    })
    .catch((err) => {
      console.error(err);
    });

  next();
};

export { uploadMiddleware, jimpProcess };
