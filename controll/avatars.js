const fs = require("node:fs/promises");
const path = require("node:path");
const { User } = require("../models/user");
const jimp = require("jimp");

const uploadAvatar = async(req, res, next) => {
    try {
        if (!req.file) {
            throw new Error("No file attacched");
        }

        const image = await jimp.read(req.file.path);
        await image.cover(250, 250).writeAsync(req.file.path);

        await fs.rename(
            req.file.path,
            path.join(__dirname, "..", "public/avatars", req.file.filename)
        );

        const avatarURL = `/avatars/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(
            req.user.id, { avatarURL }, { new: true }
        ).exec();

        res.json({ avatarURL: user.avatarURL });
    } catch (error) {
        if (error.message === "No file attached") {
            res.send({ message: "Прикріпіть зображення !" });
        } else {
            next(error);
        }
    }
};

module.exports = { uploadAvatar };