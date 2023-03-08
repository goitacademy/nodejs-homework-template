const { Schema, model } = require("mongoose");
const mongooseErrorHandler = require("../helpers/handleMongooseError");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(6).max(12).required(),
  favorite: Joi.boolean(),
});

const updateFavoritScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post("save", mongooseErrorHandler);

const Contact = model("contact", contactSchema);

module.exports = { schema, updateFavoritScheme };
module.exports = Contact;
