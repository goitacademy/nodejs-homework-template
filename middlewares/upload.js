const multer = require('multer');
const path = require('path');

const tmpDir = path.join(__dirname, '../', 'tmp');

const multerConfig = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, tmpDir)
    },
    filename: (req, file, cd) => {
        cd(null, file.originalname)
    },
    limits: {
        fileSize: 2048
    }
});
const upload = multer({
    storage: multerConfig
})
 

module.exports = upload;