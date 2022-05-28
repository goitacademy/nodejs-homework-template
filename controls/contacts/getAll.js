const { listContacts } = require('../../models/contacts');

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: { result: contacts },
  });
};
module.exports = getAll;
