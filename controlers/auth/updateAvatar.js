import { ctrlWrapper } from "../../helpers/ctrlWraper.js";
import { resizeImg } from "../../helpers/resizeImage.js";
import { join } from 'path';
import { promises as fs } from 'fs';
import User from "../../schemas/user.js";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarDir = join(__dirname, '../', '../', 'public', 'avatars');

const update = async (req, res) => {
    const { _id } = req.user;
    if (!req.file) {
        return res.send('Please add a picture for the avatar')
    }
    const { path: tempUpload, originalname } = req.file;

    resizeImg(tempUpload);

    const filename = `${_id}_${originalname}`
    const resultUpload = join(avatarDir, filename);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
        avatarURL,
    })
};

export const updateAvatar = ctrlWrapper(update);