const multer = require("multer")
const path = require("path")

const destination = path.resolve("temp")

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + Math.random(Math.random() * 1E9) + "_" + file.originalname;
        cb(null, filename)
    }
})

const upload = multer({
    storage,
})

module.exports = upload;