const operations = require('../../models/contactsOperations');

const deleteContact = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const contact = await operations.removeContact(id);
    if (!contact) {
      const error = new Error(
        `A contact with id ${id} can't be deleted as it was not found`
      );
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
