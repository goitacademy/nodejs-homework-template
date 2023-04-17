const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../utils");
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
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
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is required`,
    "string.empty": `"phone" cannot be empty`,
    "number.base": `"phone" must be number`,
  }),
  favorite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

const schemas = {
  addSchema,
  updateStatusSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
