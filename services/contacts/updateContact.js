// ./services/contacts/removeContact.js

const Contact = require('../../models/contacts');

/**
 * Оновлює контакт за ідентифікатором з новими полями.
 *
 * @param {string} id - Ідентифікатор контакту, який потрібно оновити.
 * @param {Object} fields - Об'єкт, що містить нові поля та значення для оновлення контакту.
 * @returns {Promise<Object>} - Проміс, що вирішується з оновленим об'єктом контакту,
 * якщо оновлення успішне. Повертається `null`, якщо контакт не знайдено.
 */
const updateContact = (id, fields) =>
  Contact.findByIdAndUpdate(id, fields, { new: true });

module.exports = updateContact;
