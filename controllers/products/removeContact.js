const contactsOperation = require('../../models/contacts');

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contactsOperation.removeContact(contactId);
    if (!removeContact) {
      const error = new Error(`Contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      message: 'contact deleted',
      code: 200,
      data: { removeContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
