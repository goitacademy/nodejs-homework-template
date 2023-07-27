// ./services/contacts/getOneContact.js

const Contact = require('../../models/contacts');

/**
 * Знаходить контакт за ідентифікатором.
 *
 * @param {string} id - Ідентифікатор контакту, за яким відбувається пошук.
 * @returns {Promise<Object>} - Проміс, що вирішується з об'єктом контакту,
 * якщо контакт існує за вказаним ідентифікатором. Повертається `null`, якщо контакт не знайдено.
 */
const getOneContact = (id) => Contact.findById(id);

module.exports = getOneContact;
