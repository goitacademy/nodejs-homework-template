const contactsOperation = require('../../model/contacts');

const getAll = async (req, res) => {
  const contacts = await contactsOperation.listContacts();
  res.json({
    status: 200,
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
