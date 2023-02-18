// const contactsOperation = require('../../models/contactsOperation');
const { Contact } = require('../../models');

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  // const newContact = await contactsOperation.addContact(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
