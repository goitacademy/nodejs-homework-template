import Jimp from "jimp";
import { HttpError } from "../helpers/index.js";

const processPhoto = async (req, res, next) => {
  Jimp.read(req.file.path)
    .then((image) => {
      image.resize(250, 250);
      next();
    })
    .catch((err) => {
      next(HttpError(500, err.message));
    });
};

export default processPhoto;
