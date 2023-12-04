const multer = require("multer") 
const path = require("path")

const tempDir = path.join(__dirname, "../", "temp")

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filenmae: (req, file, ) => {
        cb(null, file.originalname)
    }
})






const upload = multer({
    storage: multerConfig
})

module.exports = upload