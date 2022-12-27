const { newContactSchema } = require("./newContactSchema");
const { updateContactSchema } = require("./updateContactSchema");
const { registerUserSchema } = require("./registerUserSchema");
const { loginUserSchema } = require("./loginUserSchema");
const { updateUserSchema } = require("./updateUserSchema");
const { verifyUserSchema } = require("./verifyUserSchema");

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  newContactSchema,
  updateContactSchema,
  verifyUserSchema,
};
