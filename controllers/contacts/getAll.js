const contacts = require("../../models/contacts");

const getAll = async (_, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

module.exports = getAll;
