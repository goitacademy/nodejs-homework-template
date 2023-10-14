const path = require("node:path");

const getUploadsPath = () => {
	const now = new Date();
	return path.join(
		process.cwd(),
		"uploads",
		now.getFullYear().toString(),
		(now.getMonth() + 1).toString
	);
};

const getImagesPath = () => {
	return path.join(process.cwd(), "images");
};

module.exports = {
	UPLOADS_PATH: getUploadsPath(),
	IMAGES_PATH: getImagesPath(),
};
