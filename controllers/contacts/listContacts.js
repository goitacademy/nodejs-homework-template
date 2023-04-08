const contactsOperation = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  const contacts = await contactsOperation.listContacts();
  res.json(contacts);
};

module.exports = listContacts;
