const ctrlWrapper = require("./ctrlWrapper");
const {
  contactValidator,
  updContactValidator,
} = require("./joiContactValidator");

module.exports = { ctrlWrapper, contactValidator, updContactValidator };
