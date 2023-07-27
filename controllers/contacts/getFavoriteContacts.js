// ./controllers/contacts/getFavoriteContacts.js

const services = require('../../services/contacts');
const { catchAsync } = require('../../utils');

/**
 * Контролер для отримання контактів з властивістю "favorite": true.
 */
const getFavoriteContacts = catchAsync(async (req, res) => {
  console.log(req);
  const favoriteContacts = await services.getFavoriteContacts();

  res.status(200).json({
    msg: 'Success',
    favoriteContacts,
  });
});

module.exports = getFavoriteContacts;
