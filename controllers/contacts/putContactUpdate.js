const contactsOperations = require('../../models/contacts');
const createError = require('http-errors');

const schema = require('../../schemas/contactSchema');

const putContactUpdate = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { error } = schema.validateAsync(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    const { name, email, phone } = req.body;

    if (name === undefined || email === undefined || phone === undefined) {
      throw createError(400, 'missing fields');
    }

    const result = await contactsOperations.updateContact(contactId, req.body);

    if (!result) {
      throw createError(404, 'Not found');
    }

    res.json({
      status: 'success',
      code: 200,
      message: 'updated',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = putContactUpdate;
