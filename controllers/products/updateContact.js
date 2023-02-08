const contactsOperation = require('../../models/contacts');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await contactsOperation.updateContact(
    contactId,
    req.body
  );
  if (!updateContact) {
    const error = new Error(`Contact by id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: 'success',
    code: 200,
    data: { updateContact },
  });
};

module.exports = updateContact;
