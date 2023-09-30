const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const nameRegExp = "^[A-Za-zА-Яа-я]+( [A-Za-zА-Яа-я]+)?$";
const phoneRegExp = "^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: RegExp(nameRegExp),
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: RegExp(phoneRegExp),
      required: true,
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

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

// Joi schema for POST
const addSchema = Joi.object({
  name: Joi.string().pattern(RegExp(nameRegExp)).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.string().pattern(RegExp(phoneRegExp)).required(),
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
