const operation = require('../../models/contacts');

const getAll = async (req, res) => {
  const result = await operation.listContacts();
  res.json(result);
};

module.exports = getAll;
