const { Schema, model } = require("mongoose");

const Joi = require("Joi");

const contactSchema = Schema(
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
      // default: false,
    },
  },
  { versionKey: false, timestapms: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const statusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = contactSchema;
// module.exports = statusSchema;

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  statusSchema,
};
