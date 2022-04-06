const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  }, {
    versionKey: false,
    timeStamp: true,
    
});

const joiContactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(40)
        .required()
        .messages({
    'any.required': 'missing required name field'
  }),
    email: Joi.string()
        .messages({
            'any.required': 'missing required email field'
        }),
    phone: Joi.string()
        .min(3)
        .max(40)
        .messages({
        'any.required': 'missing required phone field'
        }),
    favorite: Joi.boolean(),
    
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required(),
});

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    joiContactSchema,
    joiFavoriteSchema,
};