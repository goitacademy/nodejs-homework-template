const { HttpError } = require("../helpers");

const supportedFormats = ["bmp", "gif", "jpeg", "png", "tiff", "jpg"];

const uploadChecker = async (req, res, next) => {
	if (!req.file) {
		next(HttpError(400, "attach the file"));
	}
	try {
		const { originalname } = req.file;
		const idx = originalname.lastIndexOf(".");
        const fileFormat = originalname.slice(idx + 1).toLowerCase();
        
		if (!supportedFormats.includes(fileFormat)) {
			next(
				HttpError(
					400,
					`this format of file: ${originalname} doesn't support, please use this formats ${supportedFormats.join(
						", ",
					)}!`,
				),
			);
        }
        
        next();
        
    } catch {
        
        HttpError(400, "attach the file");
        
	}
};
module.exports = uploadChecker;