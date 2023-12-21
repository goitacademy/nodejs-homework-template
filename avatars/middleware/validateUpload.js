const upload = require("../config/multer");

const validateUpload = upload.single("avatar");

module.exports = validateUpload;
