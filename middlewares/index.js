const controllerWrapper = require('./controllerWrapper');
const validation = require('./validation');
const validationFavorite = require('./validationFavoritStatus');
const authenticate = require('./authenticate');
const upload = require('./upload');
const repeatVerify = require('./repeatVerify')

module.export = {
  controllerWrapper,
  validation,
  validationFavorite,
  authenticate,
  upload,
  repeatVerify
};
