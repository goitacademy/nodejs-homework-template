const HttpError = require("./httpError");
const schemaContact = require("../schema/contacts/joiContacts");
const { status } = require("../consts");

const validateContact = (obj) => {
  const { error } = schemaContact.validate(obj);

  if (error) {
    throw HttpError({ ...status.MISSING_DATA, message: error.message });
  }
};

module.exports = validateContact;
