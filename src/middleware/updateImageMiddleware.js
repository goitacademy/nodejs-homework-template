import createError from 'http-errors';
import path from 'path';
import fs from 'fs/promises'; // working with files
import Jimp from 'jimp'; // image update
import { FILE_DIR } from '../constants/constants.js';

export const updateImageMiddleware = async (req, res, next) => {
  if (!req.file) {
    next(new createError(400, `File doesn't exist`));
    return;
  }

  const { filename } = req.file;
  const tmpPath = path.resolve(FILE_DIR, filename);
  const publicPath = path.resolve('./public/avatars', filename);

  try {
    const file = await Jimp.read(tmpPath); // find initial file
    // change initial file and rewrite to public folder
    file.cover(250, 250).resize(250, Jimp.AUTO).quality(60).write(publicPath);

    await fs.unlink(tmpPath); // remove initial file from tmp folder

    next();
  } catch (error) {
    await fs.unlink(tmpPath);
    next(new createError(400, error.message));
  }
};
