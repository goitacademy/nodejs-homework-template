// ./controllers/contacts/removeContact.js

const services = require('../../services/contacts');
const { catchAsync } = require('../../utils');

/**
 * Контролер видалення контакту.
 */
const removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await services.removeContact(id);

  res.sendStatus(204);
});

module.exports = removeContact;
