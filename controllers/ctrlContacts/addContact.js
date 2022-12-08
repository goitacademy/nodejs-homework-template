const contacts = require("../../models/contacts");

const addContact = async (req, res) => {
  const { body } = req;

  const result = await contacts.addContact(body);

  res.status(201).json(result);
};

module.exports = addContact;
