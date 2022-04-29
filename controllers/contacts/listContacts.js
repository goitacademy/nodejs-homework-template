const contactsOperations = require("../../models");

const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json(contacts);
};

module.exports = listContacts;
