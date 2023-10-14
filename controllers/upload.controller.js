const fs = require("node:fs").promises;
const path = require("node:path");

const IMAGES_DIR = path.join(process.cwd(), "images");

const uploadFile = async (req, res, next) => {
	const { description } = req.body;
	const { path: temporaryName, originalname } = req.file;
	const fileName = path.join(IMAGES_DIR, originalname);
	try {
		await fs.rename(temporaryName, fileName);
	} catch (err) {
		await fs.unlink(temporaryName);
		return next(err);
	}
	return res.json({
		description,
		message: "File load successful",
		status: 200,
	});
};

module.exports = { uploadFile };
