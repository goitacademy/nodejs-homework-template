const contacts = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = listContacts;
