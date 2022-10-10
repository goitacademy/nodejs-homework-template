const { Contacts } = require('../../models/contacts');

const getAll = async (req, res) => {
  const result = await Contacts.find();
  res.json(result);
};

module.exports = getAll;
