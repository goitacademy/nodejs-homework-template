const contacts = require("../../models/contacts");

const getAllListContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = getAllListContacts;