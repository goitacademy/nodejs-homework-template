const { NotFound } = require('http-errors');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');
const { users: service } = require('../../service');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const { path: tmpUpload, originalname } = req.file;
    const { _id } = req.user;
    const avatarName = `${_id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, avatarName);
        await fs.rename(tmpUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", avatarName);
        Jimp.read(avatarURL)
            .then(avatarURL => {
                return avatarURL
                    .resize(250, 250)
                    .write(resultUpload);
            })
            .catch(err => {
                console.error(err.message);
            });
        const result = await service.updateUserAvatar(_id, { avatarURL });
        if (!result) {
            throw new NotFound("Not authorized");
        }
        res.json({
            status: "success",
            code: 200,
            result: {
                avatarURL
            }
        });
    } catch (error) {
        await fs.unlink(tmpUpload);
        throw error;
    }
};

module.exports = updateAvatar;
