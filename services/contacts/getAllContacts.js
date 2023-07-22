// ./services/contacts/getAllContacts.js

const Contact = require('../../models/contacts');

/*
 * Сервіс для отримання ВСІX контактів.
 */

const getAllContacts = () => Contact.find();

module.exports = getAllContacts;
