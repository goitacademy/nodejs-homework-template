import fs from 'fs/promises';

const isDirExist = (directory) =>
  fs
    .access(directory)
    .then(() => true)
    .catch(() => false);

export const createDirIfNotExist = async (directory) => {
  if (!(await isDirExist(directory))) {
    await fs.mkdir(directory);
  }
};
