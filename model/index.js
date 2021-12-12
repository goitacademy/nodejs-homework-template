const { Contact, joiSchema, statusJoiSchema } = require("./contactsSchema");
const {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
} = require("./users");

module.exports = {
  Contact,
  joiSchema,
  statusJoiSchema,
  User,
  joiRegisterSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
};
