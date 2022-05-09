const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = Schema(
  {
    name: {
      type: String,
      min: [2, "Short name"],
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: [
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please fill a valid email address",
      ],
      required: [true, "email is required"],
    },
    phone: {
      type: String,
      match: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      required: [true, "phone-number is required"],
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
const joiSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const Contact = model("contact", contactSchema);
module.exports = { Contact, joiSchema, updateFavoriteSchema };
