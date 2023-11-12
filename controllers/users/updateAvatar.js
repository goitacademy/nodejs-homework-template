import path from "path";
import * as fs from "fs";
import { nanoid } from "nanoid";
import { isImageAndTransform } from "../../middlewares/upload.js";
import { User } from "../../service/schemas/User.js";
import { updateUser } from "../../models/users.js";
export const updateAvatar = async (req, res, next) => {
  const userId = res.locals.user._conditions._id;

  const user = await User.findById(userId);
  console.log(user);
  const storeImage = path.join(process.cwd(), "public/avatars");
  const { path: temporaryPath, originalname } = req.file;
  const extansion = path.extname(temporaryPath);
  const fileName = `${user.email}${extansion}`;
  const filePath = path.join(storeImage, fileName);
  const avatarNewURL = `/avatar/${fileName}`;

  try {
    await fs.renameSync(temporaryPath, filePath);
  } catch (error) {
    console.log(error);
    await fs.unlink(temporaryPath);
    return next(error);
  }
  const isValidAndTransform = await isImageAndTransform(filePath);
  if (!isValidAndTransform) {
    await fs.unlink(filePath);
    return res
      .status(400)
      .json({ message: "File isnt a photo but is pretending" });
  }
  await updateUser(userId, { avatarURL: avatarNewURL });
  res.json({ message: avatarNewURL });
};
