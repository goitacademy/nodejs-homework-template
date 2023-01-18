const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { User } = require('../../models/user');
const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async(req, res) => {
    // переместили
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const filename = `${_id}_${originalname}`;
  
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    // обработаем аватарку
    const resizeAvatar = await Jimp.read(resultUpload);
    resizeAvatar.resize(250, 250).writeAsync(resultUpload);

    // перезаписали в базе
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    // отправили на фронтент
    res.json({
        avatarURL,
    }); 
   
}

module.exports = updateAvatar;
