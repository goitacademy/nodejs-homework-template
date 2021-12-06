const contactsOperation = require('../../model/contacts');

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.removeContact(contactId);
  res.json({
    status: 200,
    message: `Contact with id=${contactId} delete`,
    data: { result },
  });
};

module.exports = deleteById;
