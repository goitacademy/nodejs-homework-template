const contacts = require("../../models/contacts");

const addContacts = async (req, res, next) => {
  const result = await contacts.addContact(req.body);

  res.status(201).json(result);
};

module.exports = addContacts;
