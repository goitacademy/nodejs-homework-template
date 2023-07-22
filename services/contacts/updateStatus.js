// ./services/contacts/updateStatus.js

const { Contact } = require('../../models');

/**
 * Оновити статус контакту.
 */
const updateStatus = (id, status) =>
  Contact.findByIdAndUpdate(id, status, { new: true });

module.exports = updateStatus;
