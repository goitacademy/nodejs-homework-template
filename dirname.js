// import { fileURLToPath } from 'url';
const fileURLToPath = require('url');
const dirname = require('path');
// import { dirname } from 'path';

const createDirnameAndFileName = (importUrl) => {
  const __filename = fileURLToPath(importUrl);
  const __dirname = dirname(__filename);

  return { __filename, __dirname };
};

module.exports = createDirnameAndFileName;
