const contactsOperations = require('../../models/contacts');
const createError = require('http-errors');

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      throw createError(404, 'Not found');
    }

    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getById;
