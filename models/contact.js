const {Schema, model} = require('mongoose');

const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
  })


  
const updateFavorites = Joi.object({
  favorite: Joi.boolean().required(),
})


  

const contactSchema = new Schema({
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
    }, {versionKey: false,})


    const schemas = {
      addSchema,
      updateFavorites,
    }

const Contact = model('contact', contactSchema)
module.exports = {
  Contact,
  schemas,
};