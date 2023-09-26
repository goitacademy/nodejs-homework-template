const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

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
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

// Joi schema for POST
const addSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[A-Za-zА-Яа-я]+( [A-Za-zА-Яа-я]+)?$"))
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{3}-[0-9]{2}-[0-9]{2}$"))
    .required(),
  favorite: Joi.boolean(),
}).with("name", ["email", "phone"]);

// Joi schema for PATCH
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
