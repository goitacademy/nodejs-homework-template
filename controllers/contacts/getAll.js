const contactsOperations = require('../../models/contacts');

const getAll = async (req, res) => {
  const listContacts = await contactsOperations.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: { listContacts },
  });
};

module.exports = getAll;
