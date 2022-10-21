const fs = require('fs').promises;
const path = require('path');
const jimp = require('jimp');
const {User} = require('../../models/user');

const avatarDir = path.join(__dirname, '..', '..', 'public', 'avatars');

const updateAvatar = async(req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const extention = originalname.split('.').pop();
    const filename = `${_id}.${extention}`;
    const resultUpload = path.join(avatarDir, filename);
    const { file } = req;
    const img = await jimp.read(file.path);
		await img.resize(250, 250, jimp.HORIZONTAL_ALIGN_CENTER, jimp.VERTICAL_ALIGN_MIDDLE)
            .writeAsync(file.path);
        await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', filename);
        await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,   
    });
};

module.exports = updateAvatar;
