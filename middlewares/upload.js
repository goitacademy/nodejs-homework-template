const multer = require("multer");

const path = require("path");

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePreffix = req.user.email;
        const { originalname } = file;
        const filename = `${uniquePreffix}_${originalname}`;
        cb(null, filename);
    }
});

const upload = multer({
    storage,
});

module.exports = upload;