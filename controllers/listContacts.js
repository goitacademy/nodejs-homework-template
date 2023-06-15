const { readContacts } = require("../models/contacts");

const listContacts = async (req, res, next) => {
  const result = await readContacts();
  res.json(result);
};

module.exports = listContacts;