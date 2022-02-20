const {
  schemaCreateContact,
  schemaUpdateContact,
} = require("./contacts-validation-schemes");

const router = require("./contacts");
module.exports = { schemaCreateContact, schemaUpdateContact, router };
