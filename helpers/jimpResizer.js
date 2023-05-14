const jimp = require("jimp");

const jimpResizer = async (path) => {
	try {
		const image = await jimp.read(path);
		await image.contain(250, 250);
		await image.resize(250, 250);
		await image.writeAsync(path);
	} catch (error) {
		console.error(error);
	}
};

module.exports = jimpResizer;