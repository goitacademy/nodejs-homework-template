const Contact = require("../contacts");
const HttpError = require("../../helpers/HttpError");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    throw new HttpError(500, "Error fetching contacts from the database");
  }
};

module.exports = listContacts;
