const Jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');

const {User} = require('../../models/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {

const {path: tempUpload, originalname} = req.file;

const img = await Jimp.read(tempUpload);
await img.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(tempUpload);


const {_id: id} = req.user; 
const imageName = `${id}_${originalname}`;

try {
const resultUpload = path.join(avatarsDir, imageName);
await fs.rename(tempUpload, resultUpload)
const avatarURL = path.join('public', 'avatars', imageName);
await User.findByIdAndUpdate(req.user._id, {avatarURL});

res.status(200).json({avatarURL});

} catch (error) {
await fs.unlink(tempUpload);
return error.message; 
}
}

module.exports = updateAvatar;

