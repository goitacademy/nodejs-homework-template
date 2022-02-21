const {modelContacts} = require('../../models');

const getAll = async (req, res) => {
  const contacts = await modelContacts.listContacts();
  res.json({status: 'success', code: 200, data: contacts});
};

module.exports = getAll;
