const operationsContacts = require('../../models/contacts');
const createError = require('http-errors');

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const newContact = req.body;

  const updatedContact = await operationsContacts.updateContact(
    contactId,
    newContact
  );

  if (!updatedContact) {
    throw new createError.NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: updatedContact,
    message: 'Contact updaded',
  });
};

module.exports = updateById;
