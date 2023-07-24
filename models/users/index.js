const { User } = require("./user");
const { authSchema, loginSchema } = require("./user");

module.exports = {
  User,
  authSchema,
  loginSchema,
};
