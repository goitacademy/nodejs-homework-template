
const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactsSchema = Schema({
    name: {
        type: String,
        match: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
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
}, { versionKey: false, timestamps: true })
  
const Contact = model("contact", contactsSchema)

const joiSchema = Joi.object({
    name: Joi.string()
        .pattern(/^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/)
         .min(3)
        .max(30)
        .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(2)
    .max(15)
        .required(),
  favorite: Joi.bool(),
})
const joiSchemaFavoriteStatus = Joi.object({
     favorite: Joi.bool(),
 })


module.exports = {
    Contact,
    joiSchema,
    joiSchemaFavoriteStatus
}

