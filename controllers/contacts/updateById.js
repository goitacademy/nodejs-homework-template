const { NotFound } = require('http-errors');

const contactsOperations = require('../../models/contacts');

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await contactsOperations.updateContact(
    contactId,
    req.body
  );

  if (!updatedContact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    cose: 200,
    data: {
      updatedContact,
    },
  });
};

module.exports = updateById;
