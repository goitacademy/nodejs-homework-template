const { Schema, model } = require("mongoose");
const Joi = require("joi");

const joiShema = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
      .required(),
    phone: Joi.string().alphanum().min(3).max(30).required(),
  });
  const validationResult = schema.validate(data);
  return validationResult;
};
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
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiShema };
