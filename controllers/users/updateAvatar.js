import path from "path";
import * as fs from "fs";
import { nanoid } from "nanoid";

export const updateAvatar = async (req, res, next) => {
  // const { id } = req.user;
  const storeImage = path.join(process.cwd(), "public/avatars");
  const { path: temporaryPath, originalname } = req.file;
  const extansion = path.extname(temporaryPath);
  const fileName = `${nanoid()}${extansion}`;
  const filePath = path.join(storeImage, fileName);
  try {
    await fs.rename(temporaryPath, filePath);

    // await Jimp.read(`tmp/${originalname}`)
    //   .then((avatar) => {
    //     return avatar.resize(250, 250).greyscale().write(`tmp/${originalname}`);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  } catch (error) {
    console.log(error);
    fs.unlink(temporaryPath);
    return next(error);
  }
};
