const { listContacts } = require("../models/contacts");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
};

module.exports = getContacts;
