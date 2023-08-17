import Jimp from "jimp";

async function resize(URL) {
	console.log(URL);
	const image = await Jimp.read(URL);
	image
		.cover(250, 250, function (err) {
			if (err) throw err;
		})
		.write(URL);
}

export default resize;