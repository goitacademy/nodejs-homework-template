// ./services/contacts/createContact.js

const Contact = require('../../models/contacts');

/**
 * Перевіряє наявність контакту в базі даних за заданим полем.
 *
 * @param {Object} field - Об'єкт, що містить поля і значення для перевірки.
 * Наприклад, { email: 'example@example.com' } для перевірки наявності контакту з вказаною електронною поштою.
 * @returns {Promise<Boolean>} - Проміс, що вирішується логічним значенням `true`, якщо контакт існує, або `false` - якщо немає.
 */
const checkContactExists = (field) => Contact.exists(field);

module.exports = checkContactExists;
