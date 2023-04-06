const contacts = require("../../models/contacts");

const getContacts = async (req, res, next) => {
  const result = await contacts.getContacts();
  res.json(result);
};

module.exports = { getContacts };