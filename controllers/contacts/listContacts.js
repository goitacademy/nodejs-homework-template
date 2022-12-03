const contactsOperations = require("../../models/contacts");

const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.status(200).json({ contacts });
};

module.exports = listContacts;
