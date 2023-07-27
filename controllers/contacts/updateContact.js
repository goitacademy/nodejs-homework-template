// ./controllers/contacts/removeContact.js

const services = require('../../services/contacts');
const { catchAsync } = require('../../utils');

/**
 * Контролер оновлення контакту.
 */
const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedContact = await services.updateContact(id, {
    name: req.body.name,
  });

  res.status(200).json({
    msg: 'Success',
    contact: updatedContact,
  });
});

module.exports = updateContact;
