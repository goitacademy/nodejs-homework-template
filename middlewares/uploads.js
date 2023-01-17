const multer = require("multer");

const uploads = multer({ dest: "uploads/" });

module.exports = uploads;
