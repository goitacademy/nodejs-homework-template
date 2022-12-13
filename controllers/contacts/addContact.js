const contacts = require("../../models/contacts");

const addContact = async (req, res, next) => {
  const newContact = req.body;
  const result = await contacts.addContact(newContact);
  return res.status(201).json(result);
};

module.exports = addContact;
