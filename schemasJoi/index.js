const {
  contactPostValidator,
  contactPutValidator,
  favoriteJoiSchema,
} = require("./contactsValidation");

const {
  userRegJoiSchema,
  userLoginJoiSchema,
  userUpdateSchema,
} = require("./userValidation");

module.exports = {
  userRegJoiSchema,
  userLoginJoiSchema,
  userUpdateSchema,
  contactPostValidator,
  contactPutValidator,
  favoriteJoiSchema,
};
