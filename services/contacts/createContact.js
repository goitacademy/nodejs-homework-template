// ./services/contacts/createContact.js

const Contact = require('../../models/contacts');

/**
 * Створює новий контакт.
 *
 * @param {Object} fields - Об'єкт з даними нового контакту, який буде створений.
 * @returns {Promise<Object>} - Проміс, що вирішується об'єктом нового контакту,
 * якщо створення успішне, або з помилкою, якщо сталася яка-небудь помилка.
 */
const createContact = (fields) => Contact.create(fields);

module.exports = createContact;
