const Contact = require('../../models/contactModel');
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
exports.getAllContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    msg: 'Success',
    contacts,
  });
});
