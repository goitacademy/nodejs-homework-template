const joi = require('joi');
const { isValidObjectId } = require('mongoose');

const contact = joi.object({
  name: joi
    .string()
    .pattern(/^[a-zA-Z\s'’ʼ-]{3,30}$/)
    .required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(/^[0-9()+\s-]{10,19}$/)
    .required(),
  favorite: joi.boolean(),
});

const updateContact = joi.object({
  name: joi.string().pattern(/^[a-zA-Z\s'’ʼ-]{3,30}$/),
  email: joi.string().email(),
  phone: joi.string(),
  favorite: joi.boolean(),
});

const updateStatusContact = joi.object({
  favorite: joi.boolean().required(),
});

const id = joi.object({
  id: joi
    .string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('Contact not Found');
      }
      return value;
    })
    .required(),
});

exports.schema = { contact, updateContact, updateStatusContact, id };
