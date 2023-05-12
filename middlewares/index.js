const {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
} = require("./validateBody");
const { isValidId } = require("./isValidId");
const { authenticate } = require("./authenticate");

module.exports = {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
  isValidId,
  authenticate,
};
