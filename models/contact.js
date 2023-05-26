const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const phoneRegex =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "missing required fields"],
      minlength: 5,
      maxLength: 30,
    },
    email: {
      type: String,
      required: [true, "missing required fields"],
    },
    phone: {
      type: String,
      required: [true, "missing required fields"],
      unique: true,
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(30)
    .required()
    .messages({ "any.required": "missing required fields" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required fields" }),
  phone: Joi.string()
    .pattern(phoneRegex, { name: "numbers" })
    .required()
    .messages({ "any.required": "missing required fields" }),
  favorite: Joi.boolean(),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

const schemas = {
  addSchema,
  updateStatusContactSchema,
};

const Contact = model("contact", contactSchema);

contactSchema.post("save", handleMongooseError);

module.exports = { Contact, schemas };
