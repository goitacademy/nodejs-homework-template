// ./controllers/contacts/updateStatus.js

const { Contact } = require('../../models');
const { catchAsync } = require('../../utils');

/**
 * Оновити статус контакту.
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з ідентифікатором контакту у параметрі запиту та об'єктом `favorite` в тілі запиту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після оновлення статусу контакту.
 *
 * @throws {Error} - Якщо сталася помилка під час оновлення статусу контакту.
 */
const updateStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  // Перевіряємо, чи передано поле 'favorite' в тілі запиту
  if (!favorite) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  // Знаходимо контакт за його ідентифікатором і оновлюємо поле 'favorite'
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  // Якщо контакт існує і оновлено успішно, повертаємо його
  if (updatedContact) {
    return res.status(200).json({
      message: 'Success',
      contact: updatedContact,
    });
  }
  // Якщо контакт з таким ідентифікатором не знайдено, повертаємо статус 404 з повідомленням 'Not found'
  return res.status(404).json({ message: 'Not found' });
});

module.exports = updateStatus;
