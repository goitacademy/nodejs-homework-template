import * as url from 'url';
import * as path from 'path';
import Jimp from 'jimp';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const avatarSize = 250;

export const rootDirectory = path.resolve(__dirname, '../');
export const publicDirectory = 'public';
export const avatarsDirectory = path.resolve(
	rootDirectory,
	publicDirectory,
	'avatars'
);
export const tmpDirectory = path.resolve(rootDirectory, 'tmp');

export const getFilePath = (fileName) =>
	path.join(publicDirectory, 'avatars', fileName);

export const storeAvatar = async (userId, file) => {
	const inputPath = path.resolve(tmpDirectory, file.filename);
	const outputFileName = `${userId}.png`;
	const outputPath = path.resolve(avatarsDirectory, outputFileName);

	try {
		const avatar = await Jimp.read(inputPath);
		avatar.resize(avatarSize, avatarSize);
		await avatar.writeAsync(outputPath);
		return { avatarUrl: outputPath, avatarName: outputFileName };
	} catch (err) {
		console.error(err);
	}
};
