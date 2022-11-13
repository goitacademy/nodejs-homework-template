const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models/user');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', './public/avatars');

const updateAvatar = async (req, res, next) => {
    try {
        const {id} = req.user;
        const { path: tempUpload, originalname } = req.file;
        const extension = originalname.split('.').pop();
        const filename = `${id}.${extension}`;
        const uploadPath = path.join(avatarsDir, filename);
      
        await fs.rename(tempUpload, uploadPath);

        const resizedAvatar = await Jimp.read(uploadPath);
        await resizedAvatar.resize(250, 250).write(uploadPath);

        const avatarURL = path.join('/avatars', filename);
         
        await User.findByIdAndUpdate(id, { avatarURL });

        res.json({
            status: 'success',
            code: 200,
            data: {
                avatarURL,
            },
        });
    } catch (error) {
        next(error);
    }
};
    
module.exports = updateAvatar;