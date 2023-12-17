import fs from 'fs/promises';

export const removeFile = async (filePath) => {
  await fs.unlink(filePath, (err) => {
    if (err) throw err;
  });
};
