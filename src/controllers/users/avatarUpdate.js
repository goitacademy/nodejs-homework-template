const fs = require("fs/promises");
const path = require("path");
var Jimp = require('jimp');
const HTTP_CODS = require("../../helpers/httpCodes");

const {User} = require("../../models/users.schema");

const avatarDir = path.join (__dirname, "../../", "public/avatars");

const avatarUpdate = async (req, res) => {
    const { id } = req.params;
    const { path: tmpPath, originalname } = req.file;
    const uploadPath = path.jpoin(avatarDir, originalname);
    try {
        const file = await Jimp.read(tmpPath);
        await file.resize(255, 255).write(tmpPath)
        await fs.rename(tmpPath, uploadPath);
        const avatar = `/avatars/${id}/${originalname}`;
        await User.findByIdAndUpdate (id, {avatar});
        res. status (HTTP_CODS.OK)
        .json ({
            status: "success",
            message: "avatar updated",
            data: {
                result: avatar
            }
        })

    } catch (error) {
        await fs.unlink(tmpPath);
        throw error;
    }
};

module.exports = avatarUpdate;