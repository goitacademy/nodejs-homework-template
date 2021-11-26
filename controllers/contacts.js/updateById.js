const contactsOperation = require('../../model');

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = req.body;
    const updateContact = await contactsOperation.updateContact(contactId, data);
    if (!updateContact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
