const Joi = require("joi");
const {Schema, model} = require("mongoose");

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
        owner: {
          type: Schema.Types.ObjectId,
          ref: 'user',
          required: true
        }
}, {versionKey: false, timestamps: true});

const contactJoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
  })

const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required() 
}) 

const Contact = model("contact", contactSchema);

  module.exports = {
    Contact,
    contactJoiSchema,
    contactUpdateFavoriteSchema 
}