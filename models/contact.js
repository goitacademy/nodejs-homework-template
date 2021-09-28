const {Sсhema, model} = require('mongoose')
const Joi = require("joi");

const contactSchema = Sсhema({
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
}, {versionKey: false, timestamps: true})

const joiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  phone: Joi.string().min(1).required(),
  favorite: Joi.boolean()
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().require()
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiSchema,
  updateFavoriteJoiSchema,
  Contact
}