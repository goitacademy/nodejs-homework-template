const {Schema, model} = require("mongoose")

const Joi =require("joi");


const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true
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
  name: Joi.string().min(1).max(35).required(),
  email: Joi.string().min(1).max(50).required(),
  phone: Joi.number().required(),
  favorite: Joi.bool()
  })


  const favoriteJoiSchema = Joi.object({
    favorite: Joi.bool().required()
  })
  const Contact = model("contact", contactSchema)

  module.exports = {
      joiSchema,
      favoriteJoiSchema,
      Contact,
     
  }