const contacts = require('../../models/contacts');

const getAll = async (req, res) => {
  const result = await contacts.getAll();
  res.status(200).json(result);
};

module.exports = getAll;
