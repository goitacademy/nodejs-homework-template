const contacts = require("../../models/contacts");

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
