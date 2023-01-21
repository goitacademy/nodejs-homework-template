const { Schema, model } = require("mongoose");
const Joi = require('joi')
const  handleMongooseError  = require("../helpers/handleMongooseError")


const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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
});
contactSchema.post("save", handleMongooseError);



const addSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemas = { addSchema, schemaUpdateFavorite };
const Contact = model("contact", contactSchema)

module.exports = { Contact, schemas }

