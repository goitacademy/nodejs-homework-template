const {
  Contact,
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("./Contact");

const { handleSaveError, runValidatorsAtUpdate } = require("./hooks");

module.exports = {
  Contact,
  contactAddSchema,
  contactUpdateFavoriteSchema,
  handleSaveError,
  runValidatorsAtUpdate,
};
