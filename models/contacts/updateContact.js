const Contact = require("../contacts");
const HttpError = require("../../helpers/HttpError");

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (error) {
    throw new HttpError(500, "Error updating contact in the database");
  }
};

module.exports = updateContact;
