const contacts = require('../../models/contacts.js');

const addNewContacts = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addNewContacts;
