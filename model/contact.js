const Joi = require("joi");
const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
  },
  { versionKey: false, timestamps: true }
);

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.string().required(),
});

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
  contactJoiSchema,
};
