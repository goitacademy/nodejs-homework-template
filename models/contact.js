const {Schema, model} = require("mongoose");

const Joi = require('joi');

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
          type:Schema.Types.ObjectId,
          ref: "user",
        }
}, {versionKey: false, timestamps: true});

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email(),
  phone: Joi.number().positive().integer().required(),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addContactSchema,
   updateFavoriteSchema
}

const Contact = model("contact", contactSchema);

module.exports = {Contact, schemas};