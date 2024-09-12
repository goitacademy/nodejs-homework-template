const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../utils");
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
const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `"name" can't be empty`,
  }),
  email: Joi.string().required().messages({
    "string.empty": `"email" can't be empty`,
  }),
  phone: Joi.string().required().messages({
    "string.empty": `"email" can't be empty`,
  }),
  favorite: Joi.boolean(),
});

contactSchema.post("save", handleMongooseError);

const schemas = {
  addSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
