const contacts = require("../../models");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = getAll;
