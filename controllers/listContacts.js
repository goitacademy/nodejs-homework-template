const contactsOperation = require("../models/contacts");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
