const contacts = require("../../models/contacts");

const listContatcs = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = listContatcs;
