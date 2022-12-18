const { newContactSchema } = require("./newContactSchema");
const { updateContactSchema } = require("./updateContactSchema");
const { registerUserSchema } = require("./registerUserSchema");
const { loginUserSchema } = require("./loginUserSchema");
module.exports = {
  registerUserSchema,
  loginUserSchema,
  newContactSchema,
  updateContactSchema,
};
