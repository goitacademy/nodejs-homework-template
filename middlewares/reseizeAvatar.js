import Jimp from "jimp";

const resizeAvatar = async (req, res, next) => {
	if (!req.file) {
		return next();
	}

	try {
		const image = await Jimp.read(req.file.path);
		image.resize(250, 250, Jimp.RESIZE_BEZIER);
		image.writeAsync(req.file.path);
		next();
	} catch (error) {
		next(error);
	}
};

export default resizeAvatar;
