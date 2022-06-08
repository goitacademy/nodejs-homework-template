const varContact = require("./contact");
const Contact = varContact.Contact;
const varUser = require("./user");
const User = varUser.User;
const joiSchema = {
  contactAdd: varContact.joiSchema.contactAdd,
  contactUpd: varContact.joiSchema.contactUpd,
  userAdd: varUser.joiSchema.userAdd,
  userLogin: varUser.joiSchema.userLogin,
};

module.exports = {
  Contact,
  User,
  joiSchema,
};
