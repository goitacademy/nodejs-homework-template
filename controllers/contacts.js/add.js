const contactsOperation = require('../../model');

const add = async (req, res) => {
  const data = req.body;
  const newContact = await contactsOperation.addContact(data);
  res.status(201).json(newContact);
};

module.exports = add;
