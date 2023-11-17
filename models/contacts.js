const {Schema, model} = require("mongoose");
const Joi = require("joi");

const contactsSchema = new Schema({
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
}
}, {versionKey: false, timestamps: true});


const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean()
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema
}

const Contact = model("contact", contactsSchema);

module.exports = {
Contact,
schemas
}
