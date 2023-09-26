const { Schema, model } = require("mongoose");

const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

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

const addSchemaCreate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .messages({ "string.pattern.base": `Phone number form (097)-000-0000` })
    .required(),
  favorite: Joi.boolean(),
}).messages({ "any.required": "missing required {#label} field" });

const addSchemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .messages({ "string.pattern.base": `Phone number form (097)-000-0000` }),
  favorite: Joi.boolean(),
}).messages({ "any.required": "missing fields" });

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({ "any.required": "missing field favorite" });

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  addSchemaCreate,
  addSchemaUpdate,
  updateFavoriteSchema,
};
