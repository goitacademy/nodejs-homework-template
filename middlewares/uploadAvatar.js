const multer = require("multer");
const path = require("path");
const uploadDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
	destination: uploadDir,
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
	limits: {
		fileSize: 1048576,
	},
});

const upload = multer({
	storage: storage,
});

const uploadAvatar = upload.single("avatar");

module.exports = uploadAvatar;
