const contactsOperations = require('../../models/contacts');

const getContacts = async (req, res) => {
  const result = await contactsOperations.listContacts();

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContacts;