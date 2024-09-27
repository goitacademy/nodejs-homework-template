const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../helpers');

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => { 
    const { _id } = req.user; // id користувача (завдяки middleware authenticate)
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`; // додаємо id користувача до імені файлу
    const resultUpload = path.join(avatarsDir, filename);

    // Змінюємо розмір файлу (250 на 250)
    const image = await Jimp.read(tempUpload);
    image.resize(250, 250, Jimp.RESIZE_BEZIER, function (err) {
        if (err) throw err;
    }).write(tempUpload);
    
    await fs.rename(tempUpload, resultUpload); // переміщуємо файл із папки temp в папку public/avatars

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL }); // записуємо в БД шлях до аватарки
    
    res.json({
        avatarURL,
    });
}

module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar),
}