import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import jimp from "jimp";
import User from "../../models/userModel.js";

export async function updateAvatar(req, res) {
  const userId = req.userId;
  const { avatar } = req.files;

  if (!avatar) {
    return res.status(400).json({ message: "No avatar provided" });
  }

  try {
    const { path: tempPath, originalname } = avatar[0];

    // Opracuj awatar przy pomocy Jimp
    const image = await jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(tempPath);

    // Przenieś awatar użytkownika z folderu tmp do folderu public/avatars i nadaj mu unikalną nazwę
    const uniqueFilename = `${uuidv4()}.${originalname.split(".").pop()}`;
    const avatarPath = path.join(
      process.cwd(),
      "public",
      "avatars",
      uniqueFilename
    );
    await fs.rename(tempPath, avatarPath);

    // Zapisz URL avatara w polu avatarURL użytkownika
    const avatarURL = `/avatars/${uniqueFilename}`;
    await User.findByIdAndUpdate(userId, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
