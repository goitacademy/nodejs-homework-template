const operationsContacts = require('../../models/contacts');

const getAll = async (req, res, next) => {
  const result = await operationsContacts.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = getAll;
