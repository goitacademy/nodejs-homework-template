const contacts = require("../../models/contacts");

const listContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = listContacts;
