const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError, patterns } = require("../helpers");

const validationContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({
      "string.pattern.base":
        "Invalid email. Please provide a valid email address",
    })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const validationFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      validate: [
        {
          validator: function (v) {
            return patterns.namePattern.test(v);
          },
          message: (props) =>
            `${props.value} is invalid name. The name must be written only in letters`,
        },
        {
          validator: (v) => v.length >= 2,
          message: (props) =>
            `Invalid name. Must be at least 2 characters. Got ${props.value.length}`,
        },
        {
          validator: (v) => v.length <= 30,
          message: (props) =>
            `Invalid name. Must be no more 30 characters. Got ${props.value.length}`,
        },
      ],
      required: [true, "The name is required. Set it for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: [
        true,
        "The email is required. Please provide an email address for the contact",
      ],
    },
    phone: {
      type: String,
      unique: true,
      validate: [
        {
          validator: function (v) {
            return patterns.phonePattern.test(v);
          },
          message: "Invalid phone number. The format should be (XXX) XXX-XXXX",
        },
      ],
      required: [
        true,
        "The phone is required. Please provide phone for the contact",
      ],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  validationContact,
  validationFavorite,
};
