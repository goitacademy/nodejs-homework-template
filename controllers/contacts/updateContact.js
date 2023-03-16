const operations = require('../../models/contactsOperations');

const updateContact = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const result = await operations.updateContact(id, req.body);
    if (!result) {
      const error = new Error(`No results for contact with id ${id}`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
