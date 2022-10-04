const { Contact, contactSchemas } = require("./contacts");
const { User, signupSchema, loginSchema } = require("./users");
module.exports = {
  Contact,
  User,
  contactSchemas,
  signupSchema,
  loginSchema,
};
