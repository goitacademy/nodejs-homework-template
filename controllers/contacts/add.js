const contacts = require('../../models/contacts');

const add = async (req, res) => {
  res.status(201).json(await contacts.addContact(req.body));
};

module.exports = add;
