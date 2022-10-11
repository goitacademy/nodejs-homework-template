const contacts = require("../../models/contacts/contacts");

const listContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = listContacts;
