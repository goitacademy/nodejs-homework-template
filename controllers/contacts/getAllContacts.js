// ./controllers/contacts/getAllContacts.js

const services = require('../../services/contacts');
const { catchAsync } = require('../../utils');

/**
 * Контролер для отримання ВСІX контактів.
 */
const getAllContacts = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const contacts =
    req.query.favorite !== undefined
      ? await services.getFavoriteContacts({
          favorite: req.query.favorite,
          owner: userId,
        })
      : await services.getAllContacts(userId);

  res.status(200).json({
    msg: 'Success',
    contacts,
  });
});

module.exports = getAllContacts;
