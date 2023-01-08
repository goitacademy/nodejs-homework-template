const {
  createContactSchema,
  updateContactSchema,
  contactFavoriteSchema,
} = require("./contacts");

const { registerUserSchema, loginUserSchema } = require("./user");

module.exports = {
  createContactSchema,
  updateContactSchema,
  contactFavoriteSchema,
  registerUserSchema,
  loginUserSchema,
};
