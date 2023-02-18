// const contactsOperation = require('../../models/contactsOperation');
const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const result = await Contact.find();
  // const contacts = await contactsOperation.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
