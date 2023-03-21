const {
  joiRegisterSchema,
  joiLoginSchema,
} = require("./authValidationSchemas");
const { joiSchema, updateFavorite } = require("./contactValidationSchema");

module.exports = {
  joiRegisterSchema,
  joiLoginSchema,
  joiSchema,
  updateFavorite,
};
