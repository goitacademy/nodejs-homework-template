import path from 'node:path';

export const createFilePath = (parentDir, fileName) => path.join(parentDir, fileName);
