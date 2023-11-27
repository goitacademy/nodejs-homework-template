const fs = require("node:fs/promises");
const path = require("node:path");
const { User } = require("../models/user");

const uploadAvatar = async(req, res, next) => {
    try {
        await fs.rename(
            req.file.path,
            path.join(__dirname, "..", "public/avatars", req.file.filename)
        );

        const avatarURL = `/avatars/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(
            req.user.id, { avatarURL }, { new: true }
        ).exec();

        res.send("Upload avatar");
    } catch (error) {
        if (error.message === "No file attached") {
            res.send({ message: "Прикріпіть зображення !" });
        } else {
            next(error);
        }
    }
};

module.exports = { uploadAvatar };