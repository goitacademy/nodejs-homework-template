const { addContact } = require('../../models/contacts');

const contactAdd = async (req, res, next) => {
  const contact = await addContact(req.body);

  res.status(201).json(contact);
};

module.exports = contactAdd;