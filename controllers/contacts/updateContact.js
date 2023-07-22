// ./controllers/contacts/removeContact.js

const services = require('../../services/contacts');
const { catchAsync } = require('../../utils');

/**
 * Оновити контакт.
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з ідентиф контакту у параметрі запиту та даними для оновлення контакту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після оновлення контакту.
 *
 * @throws {Error} - Якщо сталася помилка під час оновлення контакту.
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
