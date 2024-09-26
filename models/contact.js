const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handlerMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, require: true },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handlerMongooseError);

const validateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const ubdateFavouriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, validateSchema, ubdateFavouriteSchema };
