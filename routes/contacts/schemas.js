const schema = require('../../schemas/contact');

const getContact = schema.idSchemaGlobal;

const createContact = schema.contactSchemaGlobal;

const updateStatus = schema.idStatusSchemaGlobal

const updateContact = schema.idContactSchemaGlobal

const deleteContact = schema.idSchemaGlobal;

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatus
};
