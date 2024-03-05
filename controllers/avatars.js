const { stat, mkdir } = require("fs/promises");
const multer = require("multer");
const jimpConvert = require("../models/jimp");
const path = require("path");
const { User } = require("../models/schema");

const dirname = path.dirname(__dirname);
const avatarsFolder = path.join(dirname, "public", "avatars");
let pathToTheFile;

stat(avatarsFolder).catch(() => mkdir(avatarsFolder, { recursive: true }));

const storage = multer.diskStorage({
    destination: function (_, __, cb) {
        cb(null, avatarsFolder);
    },
    filename: function (_, file, cb) {
        const fileExt = path.extname(file.originalname);
        const fileNameWithoutExt = path.basename(file.originalname, fileExt);
        const finalFileName = `${fileNameWithoutExt}-${Date.now()}${fileExt}`;
        pathToTheFile = path.join(avatarsFolder, finalFileName);
        cb(null, finalFileName);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024,
    },
    });

    const avatars = async (req, res) => {
    const { id } = req.user;
    const urlToAvatar = `http://localhost:${process.env.PORT || 3000}/avatars/${
        req.file.filename
    }`;
    if (!req.file) {
        return res.json({
        status: "error",
        code: 500,
        message: "File does not exist",
        });
    }
    try {
        jimpConvert(pathToTheFile);
        await User.updateOne(
        { _id: id },
        {
            avatarURL: urlToAvatar,
        }
        );
        res.json({
        status: "success",
        code: 200,
        data: urlToAvatar,
        message: "The avatar has been downloaded",
        });
    } catch (error) {
        res.status(500).json({
        status: "error",
        code: 500,
        message: "File error",
        });
    }
};

module.exports = { avatars, upload };
