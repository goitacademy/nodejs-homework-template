const Joi = require('joi');
const operations = require('../../models/operations');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const contact = await operations.getById(contactId);

    if (!contact) {
      const error = new Error(`Contact with ${contactId} not found. Try to send correct id`);
      error.status = 404;
      throw error;
    }

    const result = await operations.updById(contactId, contact, req.body);

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
