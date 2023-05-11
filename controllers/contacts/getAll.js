const contacts = require("../../models/contacts.js");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  return res.json(result);
};

module.exports = getAll;
