const operationsContacts = require('../../models/contacts');

const add = async (req, res, next) => {
  const result = await operationsContacts.addContact(req.body);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: result,
    message: 'Contact added',
  });
};

module.exports = add;
