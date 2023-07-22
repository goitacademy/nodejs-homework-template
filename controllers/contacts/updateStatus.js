// ./controllers/contacts/updateStatus.js

const services = require('../../services/contacts');
const { catchAsync } = require('../../utils');

/**
 * Контролер оновлення статусу контакту.
 */
const updateStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  // Перевіряємо, чи передано поле 'favorite' в тілі запиту
  if (!favorite) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  // Знаходимо контакт за його ідентифікатором і оновлюємо поле 'favorite'
  const updatedContact = await services.updateStatus(id, { favorite });

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
