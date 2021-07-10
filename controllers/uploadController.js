import fs from 'fs/promises';
import path from 'path';
import jimp from 'jimp';

import { WrongParametersError } from '../helpers/error.js';

const AVATARS_PATH = path.resolve('public/avatars');

const uploadController = async (req, res) => {
    if (!req.file) {
        throw new WrongParametersError('Please, choose a file first!');
    }

    const { file } = req;
    const img = await jimp.read(file.path);
    await img
        .autocrop()
        .cover(
            250,
            250,
            jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
        )
        .writeAsync(file.path);
    await fs.rename(file.path, path.join(AVATARS_PATH, file.filename));
    res.status(201).json({ status: 'File successfully uploaded' });
};

export default uploadController;
