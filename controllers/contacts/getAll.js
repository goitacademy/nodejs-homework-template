const { listContacts } = require('../../models/contacts');

const getAll = async (_, res, __) => {
  const result = await listContacts();

  res.json(result);
};

module.exports = getAll;
