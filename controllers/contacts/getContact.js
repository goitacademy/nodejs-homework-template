const createError = require('http-errors');

const { getContactById } = require('../../models/contacts');

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createError(404, `Contact with id=${contactId} was not found`);
  }

  res.json(contact);
};

module.exports = getContact;