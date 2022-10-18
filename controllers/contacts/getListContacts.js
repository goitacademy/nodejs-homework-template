const contacts = require("../../models/contacts");

const getListContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = getListContacts;