const contactsOperations = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json(contacts);
};

module.exports = getAllContacts;
