const { Contact } = require('../../models');

const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'contancts uploaded',
    data: {
      contact,
    },
  });
};

module.exports = addContact;
