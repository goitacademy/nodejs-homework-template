var Jimp = require("jimp");
const getTempPath = require("./getTempPath");

const resizeByJimp = async (req) => {
	const filePath = getTempPath(req);
	return await Jimp.read(filePath).then((image) =>
		image.resize(250, 250).write(filePath)
	);
};

module.exports = resizeByJimp;
