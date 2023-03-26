const { removeContact } = require('../models/contacts');

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);
    res.status(200).json({ message: `Contact ${contactId} deleted successfully` });
  } catch (error) {
    next(error);
  }
};
module.exports = { deleteContact };
