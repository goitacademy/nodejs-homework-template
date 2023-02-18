const { Contact } = require('../../models');

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.updateOne(contactId, req.body);

  // const updateContact = await contactsOperation.updateContact(
  // contactId,
  // req.body
  // );
  if (!updateContact) {
    const error = new Error(`Contact by id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result },
  });
};

module.exports = updateContact;
