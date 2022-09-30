const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handlerSchemaErrors } = require("../helpers/index");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{2}?(-|\s)?\d{2}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string()
    .required()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{2}?(-|\s)?\d{2}$/),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post("save", handlerSchemaErrors);

const schemas = {
  addSchema,
  favoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
