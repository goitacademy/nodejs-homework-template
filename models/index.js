const {
  Contact,
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("./Contact");

const { User, userSignUpSchema, userSignInSchema } = require("./User");

const { handleSaveError, runValidatorsAtUpdate } = require("./hooks");

module.exports = {
  Contact,
  contactAddSchema,
  contactUpdateFavoriteSchema,
  handleSaveError,
  runValidatorsAtUpdate,
};
