const multer = require("multer");
const path = require("path");

const tempDir = path(__dirname,"../","temp");

const multerConfig = multer.diskStorage({
    destination:tempDir
});

const upload = multer({
    storage:multerConfig
})


module.exports = upload;