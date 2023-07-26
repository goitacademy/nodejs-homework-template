const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../utils/handleMongooseError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required email field",
    "string.base": "field email must be a string",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
    "string.base": "field email must be a string",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required email field",
    "string.base": "field email must be a string",
  }),
});

const patchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  patchSchema,
};

module.exports = {
  schemas,
  Contact,
};
