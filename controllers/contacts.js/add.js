const contactsOperation = require('../../model');
const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/)
    .required(),
});

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = schemaCreateContact.validate(data);
    if (error) {
      const errorMessage = error.message.includes('is required')
        ? 'missing required name field'
        : error.message.replace(/"/g, '').replace(/\:.*/, '');
      const err = new Error(errorMessage);
      err.status = 400;
      throw err;
    }
    const newContact = await contactsOperation.addContact(data);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
