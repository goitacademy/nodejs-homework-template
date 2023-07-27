// ./services/contacts/removeContact.js

const Contact = require('../../models/contacts');

/**
 * Видаляє контакт за ідентифікатором.
 *
 * @param {string} id - Ідентифікатор контакту, який потрібно видалити.
 * @returns {Promise<Object>} - Проміс, що вирішується з об'єктом контакту,
 * який був видалений з бази даних. Повертається `null`, якщо контакт не знайдено.
 */
const removeContact = (id) => Contact.findByIdAndDelete(id);

module.exports = removeContact;
