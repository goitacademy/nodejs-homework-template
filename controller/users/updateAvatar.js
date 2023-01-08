const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const RequestError = require("../../helpers/requestError");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    if (!req.file) {
        throw RequestError(400, "avatar is required");
    }
    const { id } = req.user;

    const { path: tempPath, originalname } = req.file;
    const newName = `${id}_${originalname}`;

    try {
        const resultPath = path.join(avatarsDir, newName);

        await Jimp.read(tempPath)
            .then((avatar) => {
                return avatar.resize(250, 250).write(resultPath);
            })
            .catch((err) => {
                throw err;
            });

        const avatarURL = path.join("avatars", newName);

        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { avatarURL },
            {
                new: true,
            }
        );

        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                user: {
                    avatarURL: updatedUser.avatarURL,
                },
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await fs.unlink(tempPath);
    }
};

module.exports = updateAvatar;
