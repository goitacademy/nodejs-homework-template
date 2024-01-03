const ContactsService = require("../models/contacts.js");
const HttpError = require("../error/error.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await ContactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(new HttpError(500, `Error fetching contacts: ${error.message}`));
  }
};

module.exports = {
  getAllContacts,
};
