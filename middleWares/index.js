const { auth } = require("./auth");
const {
  checkIfBodyExists,
  checkIfBodyStatusExists,
  validateBody,
} = require("./checkBodyRequest");
const { validateUser } = require("./checkUser");

module.exports = {
  auth,
  checkIfBodyExists,
  checkIfBodyStatusExists,
  validateBody,
  validateUser,
};
