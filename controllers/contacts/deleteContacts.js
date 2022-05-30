const { isValidObjectId } = require('mongoose');
const { createError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const deleteContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isValid = isValidObjectId(contactId);
    if (!isValid) {
      throw createError(404);
    }
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContacts;
