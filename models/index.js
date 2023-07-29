const { Contact, schemas } = require("./contacts");
const { User, userJoiSchemas } = require("./user");

module.exports = {
  contactsModel: { Contact, schemas },
  userModel: { User, userJoiSchemas },
};
