const createError = require('http-errors');
const { Contact } = require('../../models');
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw createError(404, 'Not found');
  }

  res.status(200).json({ message: 'Contact deleted' });
};

module.exports = deleteContact;