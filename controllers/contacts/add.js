const { addContact } = require('../../models/contacts/contacts');
// const { HTTPError } = require('../../helpers');

const add = async (req, res, next) => {
  const data = req.body;
  const result = await addContact(data);
  res.status(201).json(result);
};

module.exports = add;
