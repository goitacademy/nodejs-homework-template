const validate = require("./validateBody");
const isValidId = require('../middlewars/isValidId');
const authenticate = require("./authenticate");

module.exports = {
  validate,
  isValidId,
  authenticate,
};