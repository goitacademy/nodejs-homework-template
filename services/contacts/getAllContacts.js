// ./services/contacts/getAllContacts.js

const { Contact } = require('../../models');

/*
 * Сервіс для отримання ВСІX контактів.
 */

const getAllContacts = () => Contact.find();

module.exports = getAllContacts;
