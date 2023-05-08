const {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
} = require("./validateBody");
const { isValidId } = require("./isValidId");

module.exports = {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
  isValidId,
};
