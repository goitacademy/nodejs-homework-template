const Contact = require("../contacts");
const HttpError = require("../../helpers/HttpError");

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact.toObject({ versionKey: false });
  } catch (error) {
    throw new HttpError(500, "Error adding contact to the database");
  }
};

module.exports = addContact;
