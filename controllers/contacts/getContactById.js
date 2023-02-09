const operations = require('../../models/operations');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await operations.getById(contactId);

    if (!result) {
      const error = new Error(`Contact with ${contactId} not found. Try to send correct id`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
