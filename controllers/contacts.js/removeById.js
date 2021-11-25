const contactsOperation = require('../../model');

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedСontact = await contactsOperation.removeContact(contactId);
    if (!removedСontact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
