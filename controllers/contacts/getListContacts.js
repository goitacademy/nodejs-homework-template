const { listContacts } = require("../../models/contacts");

const getListContacts = async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
};

module.exports = getListContacts;
