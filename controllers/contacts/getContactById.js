const operations = require('../../models/contactsOperations');

const getContactById = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const contact = await operations.getContactById(id);
    if (!contact) {
      const error = new Error(`No results for contact with id ${id}`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
