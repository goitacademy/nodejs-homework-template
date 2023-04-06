const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const { MongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name must be exist"],
    },
    email: {
      type: String,
      required: [true, "email must be exist"],
    },
    phone: {
      type: String,
      required: [true, "phone must be exist"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// contactSchema.post("save", MongooseError);

const addSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"title" is required`,
  }),
  author: Joi.string().required().messages({
    "any.required": `"author" is required`,
    "string.empty": `"author" cannot be empty`,
    "string.base": `"author" must be string`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
