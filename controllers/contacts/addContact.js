const contactsOperations = require("../../models");

const addContact = async (req, res) => {
  const newContact = await contactsOperations.addContact(req.body);
  res.status(201).json(newContact);
};

module.exports = addContact;
