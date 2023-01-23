const { addContactSchema } = require("../schemas/contacts");
const { updateFavoriteSchema } = require("../schemas/contacts");
const { registerSchema } = require("../schemas/authorization");
const { loginSchema } = require("../schemas/authorization");
const { verifyEmailSchema } = require("../schemas/authorization");

module.exports = {
  addContactSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
  verifyEmailSchema,
};
