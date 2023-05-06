const { Schema, model } = require("mongoose");
const { hendleMongooseError } = require("../utils");
const Joi = require("joi");

const contactSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `"Name" is a required field ` }),
  email: Joi.string().required().messages({
    "any.required": `"Email" is a required field`,
    "string.email": "Email must be a valid email",
  }),
  phone: Joi.string()
    .required()
    .length(11)
    .pattern(/^[0-9]+$/)
    .messages({
      "any.required": `"Phone" is a required field`,
      "string.pattern.base": "Phone should include only digits",
      "string.length": "Phone length must be 11 characters long",
    }),
  favorite: Joi.boolean(),
});
const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post("save", hendleMongooseError);

const Contact = model("contact", contactSchema);
module.exports = Contact;

const schemas = {
  contactAddSchema,
  updateFavoriteContactSchema,
};

module.exports = {
  Contact,
  schemas,
};
