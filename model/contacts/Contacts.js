const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    // name не может повторятся в коллекции
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Set name for contact'],
    // email не может повторятся в коллекции
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Set phone-number for contact'],
    // phone не может повторятся в коллекции
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, {
  // не указываем версію v
  versionKey: false,
  // добавляет два поля с указанием  create, update
  timestamps: true
});

const joiSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const joiSchemaStatus = Joi.object({
  favorite: Joi.boolean().required(),
  name: Joi.string().min(2).max(25).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiSchema,
  joiSchemaStatus
}
