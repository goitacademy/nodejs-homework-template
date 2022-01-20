const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    toObject: { virtuals: true },
  },
)

const contactJoiSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = { contactJoiSchema, updateFavoriteJoiSchema, Contact }
