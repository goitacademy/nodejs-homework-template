const {Schema, model} = require('mongoose');
const Joi = require('joi');

const contactSchema = new Schema(
    {
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
    },
    {versionKey: false, timestamps: true},
);

const numberPattern =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(25).trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().pattern(numberPattern).min(10).max(13).required(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};