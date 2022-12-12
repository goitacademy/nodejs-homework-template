const contacts = require("../services/index");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = getAll;
