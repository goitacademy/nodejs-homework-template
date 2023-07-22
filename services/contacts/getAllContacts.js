// ./services/contacts/getAllContacts.js

const Contact = require('../../models/contacts');

/**
 * Отримує всі контакти з бази даних.
 *
 * @returns {Promise<Array>} - Проміс, що вирішується масивом контактів,
 * які були знайдені в базі даних. Повертається порожній масив, якщо контакти відсутні.
 */
const getAllContacts = () => Contact.find();

module.exports = getAllContacts;
