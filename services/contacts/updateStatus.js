// ./services/contacts/updateStatus.js

const Contact = require('../../models/contacts');

/**
 * Оновлює статус контакту за ідентифікатором.
 *
 * @param {string} id - Ідентифікатор контакту, для якого потрібно оновити статус.
 * @param {boolean} status - Новий статус контакту, який буде оновлений.
 * @returns {Promise<Object>} - Проміс, що вирішується з оновленим об'єктом контакту,
 * якщо оновлення успішне. Повертається `null`, якщо контакт не знайдено.
 */
const updateStatus = (id, status) =>
  Contact.findByIdAndUpdate(id, status, { new: true });

module.exports = updateStatus;
