const path = require('path');

const fs = require('fs/promises');

const Jimp = require('jimp');

const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const avatarDir = path.join(basedir, 'public', 'avatars');

const setAvatar = async (req, res) => {
    try {
        const { _id: id } = req.user;
        const { path: tmpPath, originalname } = req.file;
        const [extension] = originalname.split(".").reverse();
        const newNameAvatar = `${ id }.${extension}`;
        
// опрацьовує аватар ( автообрізка > вирівнює відповідно до заданої ширини та висоти
// > якість > перезаписує зображення)

    const image = await Jimp.read(tmpPath);
    await image
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
    .quality(100)
    .writeAsync(tmpPath);

        const uploadPath = path.join(avatarDir, newNameAvatar );
        await fs.rename(tmpPath, uploadPath);
    
        const avatarURL = path.join('public', 'avatars', newNameAvatar);
        await User.findByIdAndUpdate(id, { avatarURL });

        
        return res.json({
            status: 'Success',
            code: 200,
            message: 'Image uploaded successfully',
            data: {
                avatarURL,
            },
        });

    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
};

module.exports = setAvatar;