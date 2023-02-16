import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';

const uploadDir = path.resolve(process.cwd(), 'public');

export const resizeImageService = async (filePath: string, fileName: string, dir = 'avatars', w = 250, h = 250) => {
  const file = await Jimp.read(filePath);
  file.resize(w, h);

  return await file.writeAsync(`${path.resolve(uploadDir, dir)}/${fileName}`);
};

export const removeFile = async (filePath: string) => {
  await fs.unlink(filePath);
};
