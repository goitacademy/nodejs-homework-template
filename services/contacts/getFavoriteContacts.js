const Contact = require('../../models/contacts');

/**
 * Отримує всі контакти з бази даних, які мають властивість "favorite" зі значенням "true".
 *
 * @returns {Promise<Array>} - Проміс, що вирішується масивом контактів,
 * які були знайдені в базі даних і мають "favorite: true". Повертається порожній масив, якщо такі контакти відсутні.
 */
const getFavoriteContacts = () => Contact.find({ favorite: true });

module.exports = getFavoriteContacts;
