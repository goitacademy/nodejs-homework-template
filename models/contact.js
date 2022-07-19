const {Schema, model} = require('mongoose');
const Joi = require("joi")

const contactSchema = Schema(
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
          maxlength: 30
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
        }
      }, {versionKey: false, timestamps: true}
)



const joiSchema = Joi.object({
    name: Joi.string().required().max(30),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool()
  })

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required()
})
const Contact = model("contact", contactSchema)

module.exports = {Contact, joiSchema, favoriteJoiSchema}
