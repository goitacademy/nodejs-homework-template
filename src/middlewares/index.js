const { validateBody } = require("./validationMiddleware/validateBody");
const { validateFavorite } = require("./validationMiddleware/validateFavorite");
const { validateId } = require("./validationMiddleware/validateId");
const { authMiddleware } = require("./auth/authMiddleware");
const { uploadMiddleware } = require("./upload/uploadMiddleware");

module.exports = {
  validateId,
  validateBody,
  validateFavorite,
  authMiddleware,
  uploadMiddleware,
};
