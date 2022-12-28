const {
  createContactSchema,
  updateContactSchema,
  contactFavoriteSchema,
} = require("./contacts");

const { signupUserSchema, loginUserSchema } = require("./user");

module.exports = {
  createContactSchema,
  updateContactSchema,
  contactFavoriteSchema,
  signupUserSchema,
  loginUserSchema,
};
