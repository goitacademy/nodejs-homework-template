const ctrlWrapper = require("./ctrlWrapper");
const {
  contactValidator,
  updContactValidator,
  favoriteValidator,
} = require("./joiContactValidator");

module.exports = {
  ctrlWrapper,
  contactValidator,
  favoriteValidator,
  updContactValidator,
};
