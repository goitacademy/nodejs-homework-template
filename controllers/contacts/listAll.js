const contacts = require("../../models/contacts");

const listAll = async (req, res) => {
  const contactsList = await contacts.listContacts();
  res.json(contactsList);
};

module.exports = listAll;
