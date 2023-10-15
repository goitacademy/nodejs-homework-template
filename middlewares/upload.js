const multer = require("multer");
const path = require("path");

const upload = multer({
	dest: path.join(process.cwd(), "tmp"),
	limits: {
		fieldSize: 1048576,
	},
});

module.exports = upload.single('picture');
