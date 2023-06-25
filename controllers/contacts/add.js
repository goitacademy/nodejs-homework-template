// const { BadRequest } = require('http-errors');

const { addContact } = require('../../models/contacts');

const add = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await addContact({ name, email, phone });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { contact },
  });
};

module.exports = add;
