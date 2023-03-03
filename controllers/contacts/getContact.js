const createError = require('http-errors');

const { Contact } = require('../../models');

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw createError(404, `Contact with id=${contactId} was not found`);
  }

  res.json(contact);
};

module.exports = getContact;