const Contact = require("../contacts");
const HttpError = require("../../helpers/HttpError");
const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    throw new HttpError(500, "Error deleting contact from the database");
  }
};

module.exports = removeContact;
