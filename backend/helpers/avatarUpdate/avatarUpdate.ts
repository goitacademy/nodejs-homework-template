import Jimp from 'jimp';
import createError from '../createError';
import { unlink } from 'fs/promises';

const avatarUpdate = async (prevFileURL: string, uploadFileURL: string = prevFileURL) => {
    try {
        const image = await Jimp.read(prevFileURL)
        image.resize(250, 250)
            .writeAsync(uploadFileURL);

        await unlink(prevFileURL)
    } catch (error) {
        throw createError({
            status: 500,
            messageProd: `Internal error.`,
        })
    }
}

export default avatarUpdate;