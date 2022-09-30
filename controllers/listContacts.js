const contacts = require("../models");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = listContacts;
