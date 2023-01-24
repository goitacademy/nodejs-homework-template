const {Schema, model} = require("mongoose");
const Joi = require('joi');


const contactsSchema = Schema ({
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

const Contact = model('contact', contactsSchema);

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

const schemas = {
    addSchema
}

module.exports = {
    Contact,
    schemas
};