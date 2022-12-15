const contactsOperations = require('../../models/contacts');

const add = async (req, res) => {
  const addedContact = await contactsOperations.addContact(req.body);

  res.status(201).json({
    status: 'success',
    cose: 201,
    data: {
      addedContact,
    },
  });
};

module.exports = add;
