const {Schema, model} = require("mongoose")
const Joi = require("joi")

const favoriteList = [true, false];

const contactSchema = Schema ({
    name: {
      type:String,
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
      enum: favoriteList,
      default: false,
  },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timestamps: true })


const contactJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": 'missing required name field',
  }),
  email: Joi.string().required().messages({
    "any.required": 'missing required email field',
  }),
  phone: Joi.number().required().messages({
    "any.required": 'missing required phone field',
  }),
})

const statusJoiSchema = Joi.object({
    favorite: Joi.boolean().valid(...favoriteList).required(),
  })


const Contact = model('contact', contactSchema)

module.exports = {
    Contact,
    contactJoiSchema,
    statusJoiSchema,
}