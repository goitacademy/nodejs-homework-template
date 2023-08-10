const multer = require("multer");
const path = require("path");

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
	destination,
	filename: (req, file, cb) => {
		const { originalname } = file;
		const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
		const filename = `${uniquePrefix}_${originalname}`;

		cb(null, filename);
	}
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage,
  limits,
});


module.exports = upload;