const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact must have name'],
      minlength: 4,
    },
    email: {
      type: String,
      required: [true, 'contact must have email'],
    },
    phone: {
      type: String,
      required: [true, 'contact must have phone'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const JoiSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  JoiSchema,
};
