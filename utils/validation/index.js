const { loginSchema } = require("./LoginSchema");
const { registerSchema } = require("./RegisterSchema");
const { addSchema, updateFavoriteSchema } = require("./ValidationSchemas");

const schemas = {
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
};

module.exports = {
  schemas,
};
