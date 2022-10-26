const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set contact name'],
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
}, { versionKey: false, timestamps: true });

const Contact = model("contact", contactSchema);
  
const joiSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}),
            phone: Joi.string(),
            favorite: Joi.bool(),
});

const statusJoiSchema = Joi.object({
            favorite: Joi.bool().required(),
})


module.exports = {
  joiSchema,
  statusJoiSchema,
  Contact,
}
