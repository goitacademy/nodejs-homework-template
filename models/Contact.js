import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .pattern(/^([a-zA-Z]|\s)*$/)
    .required()
    .messages({
      "string.base": '"Name" should be a type of "text"',
      "any.required": `missing required name field`,
      "string.pattern.base": '"Name" must contains only latters',
    }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required name field`,
  }),
  phone: Joi.string()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .required()
    .messages({
      "any.required": `missing required phone field`,
      "string.pattern.base": '"Phone" must be like (111) 111-1111',
    }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .pattern(/^([a-zA-Z]|\s)*$/)
    .messages({
      "string.base": '"Name" should be a type of "text"',
      "string.pattern.base": '"Name" must contains only latters',
    }),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .messages({
      "string.pattern.base": '"Phone" must be like (111) 111-1111',
    }),
  favorite: Joi.boolean(),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const contactShema = new Schema(
  {
    name: {
      type: String,
      match: /^([a-zA-Z]|\s)*$/,

      required: [true, "missing required name field`"],
    },
    email: {
      type: String,
      required: [true, "missing required email field`"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "missing required phone field`"],
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactShema.post("save", handleSaveError);

contactShema.pre("findOneAndUpdate", preUpdate);

contactShema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactShema);

export default Contact;
