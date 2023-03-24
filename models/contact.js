const { Schema, model } = require("mongoose");
const { handleValidationErrors } = require("../errorHandlers");
const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleValidationErrors);

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "Missing required field: Name" }),
  phone: myCustomJoi
    .string()
    .required()
    .phoneNumber()
    .messages({ "any.required": "Missing required field: Phone" }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({ "any.required": "Missing required field: Email" }),
  favorite: myCustomJoi.boolean(),
});
const toggleFavoriteSchema = Joi.object({
  favorite: myCustomJoi.boolean(),
});

const schemas = {
  addSchema,
  toggleFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
