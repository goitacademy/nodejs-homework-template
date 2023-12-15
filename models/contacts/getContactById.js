const Contact = require("../contacts");
const HttpError = require("../../helpers/HttpError");

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw new HttpError(500, "Error fetching contact from the database");
  }
};

module.exports = getContactById;
