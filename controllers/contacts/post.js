const { Contact } = require('../../models');
const createError = require('http-errors');

const createContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  if (!result) {
    return res.status(400).json({ message: 'missing name field' });
  }
  return res.status(201).json({
    result,
  });
};

module.exports = createContact;
