const multer = require("multer");
const path = require("path");

const tempDirectory = path.join(__dirname, "../", "tmp");
const multerConfig = multer.diskStorage({ destination: tempDirectory });
const upload = multer({ storage: multerConfig });

module.exports = upload;
