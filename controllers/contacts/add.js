const { addContact } = require('../../models/contacts');

const add = async (req, res, _) => {
  const { name, email, phone } = req.body;
  const result = await addContact(name, email, phone);

  res.status(201).json(result);
};

module.exports = add;
