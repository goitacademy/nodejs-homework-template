const {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
} = require("./validateBody");
const { isValidId } = require("./isValidId");
const { authenticate } = require("./authenticate");
const { upload } = require("./upload");

module.exports = {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
  isValidId,
  authenticate,
  upload,
};
