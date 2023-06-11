const {
  createContact,
  updateContact,
  updateFavoriteSchema,
} = require("./contacts");

const { registerSchema, loginSchema } = require("./users");

module.exports = {
  createContact,
  updateContact,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
};
