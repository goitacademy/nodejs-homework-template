// ./controllers/contacts/getAllContacts.js

const services = require('../../services/contacts');
const { catchAsync } = require('../../utils');

/**
 * Контролер для отримання ВСІX контактів.
/**
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з даними про контакти в тілі запиту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після отримання контактів.
 * @throws {Error} - Якщо сталася помилка при отриманні контактів.
 */
const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await services.getAllContacts();

  res.status(200).json({
    msg: 'Success',
    contacts,
  });
});

module.exports = getAllContacts;
