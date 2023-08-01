const contacts = require("../../models/contacts.js");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = listContacts;
