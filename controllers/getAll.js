const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
  // const result = await contacts.getAll();
  const result = await contacts.listContacts();

  res.json(result);
};

module.exports = getAll;
