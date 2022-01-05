const {Schema, model} = require('mongoose');
const joi = require('joi')

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
  }
);


const joiContactSchema = joi.object({
  name: joi.string().min(3).max(20),
  email: joi.string().email(),
  phone: joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  favorite: joi.boolean()
});

const joiContactUpdateFavoriteSchema = joi.object({
  favorite: joi.boolean()
})

const Contact = model('contact', contactSchema);


module.exports = {
    Contact,
    joiContactSchema,
    joiContactUpdateFavoriteSchema,
};