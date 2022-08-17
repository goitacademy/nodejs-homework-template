const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(3).max(30).required(),
});

const schemas = {
  add: addSchema,
};

const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  schemas,
};
