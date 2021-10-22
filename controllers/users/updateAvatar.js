const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const updateAvatar = async(req, res, next) => {
    const { _id } = req.user;
    const { path: tempDir, originalname } = req.file;
    const [extension] = originalname.split(".").reverse();
    const filename = `${_id}.${extension}`;
    const uploadDir = path.join(__dirname, "../../", "public//avatars", filename);

    try {
        await fs.rename(tempDir, uploadDir);

        const image = path.join("avatars", filename);

        await Jimp.read(uploadDir)
            .then((photo) => {
                console.log(photo);
                return photo.resize(250, 250);
            })
            .catch((err) => {
                console.error(err);
            });

        await User.findByIdAndUpdate(_id, { avatarURL: image });

        res.json({
            status: "success",
            code: 201,
            message: "Update avatar success",
            avatarURL: image,
        });
    } catch (error) {
        await fs.unlink(tempDir);
        next(error);
    }
};

module.exports = updateAvatar;