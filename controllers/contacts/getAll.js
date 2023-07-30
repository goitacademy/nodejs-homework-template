const { listContacts } = require("../../models/contacts/index");

const getAll = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

module.exports = getAll;
