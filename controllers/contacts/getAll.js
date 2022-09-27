const contacts = require("../../models/contacts");

const getAll = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = getAll;
