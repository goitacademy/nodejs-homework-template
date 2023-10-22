import Jimp from "jimp";
import { HttpError } from "../helpers/index.js";

 const resizeAvatar = async (req, res, next) => {
  try {
    const { path } = req.file;
  const avatar = await Jimp.read(path);
    avatar.resize(250, 250).write(path);
    next();
  }
  catch (error) {
    return next(HttpError(404, error.message));
  }
}


export default resizeAvatar;