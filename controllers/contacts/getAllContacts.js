// ./controllers/contacts/getAllContacts.js

const services = require('../../services/contacts');
const { catchAsync } = require('../../utils');

/**
 * Контролер для отримання ВСІX контактів.
 */
const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await services.getAllContacts();

  res.status(200).json({
    msg: 'Success',
    contacts,
  });
});

module.exports = getAllContacts;
