const Joi = require('joi');
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const validateContact = (contact) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });

  return schema.validate(contact, { abortEarly: false });
};

const addSchema = Joi.object({    // добавив описання схеми в якості змінної, а не функції
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contact: mongoose.model('Contact', contactSchema),
  validateContact,
  addSchema, // було addSchema: validateContact, 
  updateFavoriteSchema,
};