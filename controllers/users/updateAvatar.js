const path = require('path');
const fs = require('fs/promises');
const Jimp =require('jimp');

const { User } = require('../../models');
const { ctrlWrapper } = require('../../helpers');

const avatarDir =path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const avatar = await Jimp.read(tempUpload);
    await avatar.resize(250, 250).writeAsync(tempUpload);

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json(avatarURL);
};

module.exports = ctrlWrapper(updateAvatar);