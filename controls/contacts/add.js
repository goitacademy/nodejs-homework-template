const { addContact } = require('../../models/contacts');

const add = async (req, res, next) =>
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result: await addContact(req.body) },
  });

module.exports = add;
