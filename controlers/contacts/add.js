const operationsContacts = require('../../models/contacts');
const { nanoid } = require('nanoid');

const add = async (req, res, next) => {
  const contact = req.body;
  const newContact = { ...contact, id: nanoid() };
  const result = await operationsContacts.addContact(newContact);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: result,
    message: 'Contact added',
  });
};

module.exports = add;
