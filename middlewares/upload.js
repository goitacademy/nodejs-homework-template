const multer = require("multer");
const path = require("path");
// const config = require('../config/config')
// const { UPLOAD_DIR } = config;

// const upload = multer({
// 	storage: multer.diskStorage({
// 		destination: (_, __, callback) => {
// 			callback(null, UPLOAD_DIR);
// 		},
// 		filename: (_, file, callback) => {
// 			callback(file.originalname);
// 		},
// 	}),
// });

const upload = multer({
	dest: path.join(process.cwd(), "tmp"),
	limits: {
		fieldSize: 1048576,
	},
});

module.exports = upload.single('picture');
