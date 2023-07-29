const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { HandleMongooseError } = require('../helpers');

const nameRegexp = /^[-a-zA-Zа-яА-ЯёЁ\s]+$/u;
const emailRegexp =
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const phoneRegexp = /^\(\d{3}\)\s\d{3}-\d{4}$/;


const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for this contact'],
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
    required: true,
    }
},
    { versionKey: false, timestamps: true }
);

contactSchema.post('save', HandleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(25).pattern(nameRegexp).required(),
  email: Joi.string()
    .regex(emailRegexp)
    .messages({
      "string.pattern.base": `Email must be in a valid format: name@example.com.`,
    })
    .required(),
  phone: Joi.string()
    .regex(phoneRegexp)
    .messages({
      "string.pattern.base": `Phone number must be in a valid format: (044) 555-5555 and have 10 digits.`,
    })
    .required(),
});

const updateFavoriteSchema = Joi.object({
      favorite: Joi.boolean().required(),
    });

const schemas = { addSchema, updateFavoriteSchema, };    

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };