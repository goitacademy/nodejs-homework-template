const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../tmp");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const uploader = upload.single("avatar");

module.exports = { uploader, tmpDir };
