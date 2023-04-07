const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../utils");
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
  name: Joi.string()
    .required()
    .messages({ "any.required": `"name" is required` }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
const Contact = model("Contact", contactSchema);
module.exports = {
  Contact,
  schemas,
};
