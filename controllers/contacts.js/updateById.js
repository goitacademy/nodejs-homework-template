const contactsOperation = require('../../model');

const Joi = require('joi');

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .regex(/^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/)
    .optional(),
}).or('name', 'email', 'phone');

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = req.body;
    const { error } = schemaUpdateContact.validate(data);
    if (error) {
      const err = new Error(error.message.replace(/"/g, '').replace(/\:.*/, ''));
      err.status = 400;
      throw err;
    }
    const updateContact = await contactsOperation.updateContact(contactId, data);
    if (!updateContact) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
