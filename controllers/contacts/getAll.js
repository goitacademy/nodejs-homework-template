const { listContacts } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts });
};

module.exports = getAll;
