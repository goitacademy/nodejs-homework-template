const validation = require('./validation');
const controllerWrapper = require('./controllerWrapper');
const authMiddleware = require('./authMiddleware');
const upload = require('./upload');

module.exports = {
  validation,
  controllerWrapper,
  authMiddleware,
  upload,
};
