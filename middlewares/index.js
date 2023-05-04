const {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
} = require("./validateBody");
const { isValidId } = require("./isValidId");
// console.log(validateBodyPost, validateBodyPut);
// console.log(isValidId);

module.exports = {
  validateBodyPost,
  validateBodyPut,
  validateBodyPatch,
  isValidId,
};
