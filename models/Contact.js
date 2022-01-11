const { Schema, model } = require("mongoose");
const Joi = require("joi");
const {
  phoneRegex,
  nameRegex,
  emailRegex,
  limitRegex,
  filterRegex,
} = require("../config/constants");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: nameRegex,
    },
    email: { type: String, required: true, match: emailRegex },
    phone: { type: String, required: true, match: phoneRegex },
    favorite: { type: Boolean, default: false },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(nameRegex).required(),
  email: Joi.string().email().pattern(emailRegex).required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.bool(),
});

const joiQuerySearchSchema = Joi.object({
  limit: Joi.string().pattern(limitRegex),
  skip: Joi.number().min(0),
  sortBy: Joi.string().valid(
    "name",
    "phone",
    "email",
    "favorite",
    "createdAt",
    "updatedAt"
  ),
  sortByDesc: Joi.string().valid(
    "name",
    "phone",
    "email",
    "favorite",
    "createdAt",
    "updatedAt"
  ),
  filter: Joi.string().pattern(filterRegex),
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  Contact,
  joiSchema,
  joiQuerySearchSchema,
  joiFavoriteSchema,
};
