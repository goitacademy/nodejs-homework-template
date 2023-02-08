const contactsOperation = require('../../models/contacts');
const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateContact = await contactsOperation.updateContact(
      contactId,
      req.body
    );
    if (!updateContact) {
      const error = new Error(`Contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: { updateContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
