const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../utils/handleMongooseError");

// const phoneValidate = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      // enum: []
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      // match: phoneValidate,
      // required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required email field",
    "string.base": "field email must be a string",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
    "string.base": "field email must be a string",
  }),
  phone: Joi.string()
    // .pattern(phoneValidate)
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.base": "field email must be a string",
    }),
  favorite: Joi.boolean(),
});

const schemas = {
  schema,
};

module.exports = {
  schemas,
  Contact,
};
