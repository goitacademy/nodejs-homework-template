const doesContactExist = require("../middlewares/contactExists");
const isValidId = require("../middlewares/isValidId");
const authenticate = require("../middlewares/authenticate");

module.exports = {
  doesContactExist,
  isValidId,
  authenticate,
};
