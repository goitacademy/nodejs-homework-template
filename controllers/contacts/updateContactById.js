const createError = require('http-errors');

const { updateContact } = require('../../models/contacts');

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) {
    throw createError(404, `Contact with id=${contactId} was not found`);
  }

  res.json(updatedContact);
};

module.exports = updateContactById;