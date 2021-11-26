const contactsOperation = require('../../model');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperation.getContactById(contactId);
  if (!contact) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.json(contact);
};

module.exports = getById;
