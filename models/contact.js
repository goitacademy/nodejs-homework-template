import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError";
import Joi from "joi";

const phoneRegExp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

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
      match: phoneRegExp,
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

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Missing required Name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "Missing required Email field" }),
  phone: Joi.string()
    .pattern(phoneRegExp)
    .required()
    .messages({ "any.required": "Missing required Phone field" }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = {
  favorite: Joi.boolean().required(),
};

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

export default { Contact, schemas };
