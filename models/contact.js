const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers/index.js");

const dateRegexp = /^\d{10}$/;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: dateRegexp,
      required: true,
    },
    email: {
      type: String,
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
const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(dateRegexp).required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemas = { addSchema, updateFavoriteSchema };
module.exports = { Contact, schemas };
