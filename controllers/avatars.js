const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const token = require("../utils");
const {
    authModel: { UserModel },
} = require("../models");

const update = async (req, res) => {
    const avatarPath = req.file.path;
    const dirname = __dirname.split(path.sep).slice(0, __dirname.split(path.sep).length - 1);
    const avatarDir = path.join(...dirname, "public", "avatars");
    Jimp.read(avatarPath, (err, lenna) => {
        if (err) throw err;
        lenna
            .resize(250, 250) // resize
            .quality(60) // set JPEG quality
            .write(avatarDir + "/" + req.file.filename); // save
    });
    fs.unlink(avatarPath);

    const [_, userToken] = req.headers.authorization.split(" ");
    const userId = token.getIdByToken(userToken);
    const normalizePath = path.join("/avatars", req.file.filename);
    const updatedAvatar = await UserModel.findByIdAndUpdate(
        // "61891ad7552c21952062eb4f",
        {
            avatarURL: normalizePath,
        },
        {
            new: true,
            select: "avatarURL",
        }
    );
    res.status(200).json(updatedAvatar);
};

module.exports = { update };
