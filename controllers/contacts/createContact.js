const Contact = require('../../models/contactModel');
const { catchAsync } = require('../../utils');

/**
 * Створити новий контакт.
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з даними про новий контакт в тілі запиту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після створення контакту.
 * @throws {Error} - Якщо сталася помилка при створенні контакту.
 */
exports.createContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.body);

  newContact.password = undefined;

  res.status(201).json({
    msg: 'Success',
    contact: newContact,
  });
});
