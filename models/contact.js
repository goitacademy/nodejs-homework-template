const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const  Joi = require("joi")

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
});

contactSchema.post("save", handleMongooseError);

 const schemaPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const schemaPut = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
});

const schemaPatch = Joi.object({
  favorite: Joi.boolean(),
});

const Contact = model("contact", contactSchema);

const schemas = {
  schemaPost,
  schemaPut,
  schemaPatch
}

module.exports = {
  Contact,
  schemas,
}
