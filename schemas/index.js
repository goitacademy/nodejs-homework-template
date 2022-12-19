const { newContactSchema } = require("./newContactSchema");
const { updateContactSchema } = require("./updateContactSchema");
const { registerUserSchema } = require("./registerUserSchema");
const { loginUserSchema } = require("./loginUserSchema");
const { updateUserSchema } = require("./updateUserSchema");

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  newContactSchema,
  updateContactSchema,
};
