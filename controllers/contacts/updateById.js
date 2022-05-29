const contactsOperations = require('../../models/contacts');

const updateById = async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;

    const result = await contactsOperations.updateContact(contactId, body);

    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
