const {addContact} = require('../../models/contacts');

const add = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json({status: 'success', code: 201, data: newContact});
};

module.exports = add;
