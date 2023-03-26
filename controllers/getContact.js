const { getContactById } = require('../models/contacts');

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      const error = new Error('Contact not found');
      error.statusCode = 404;
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

module.exports = { getContact };
