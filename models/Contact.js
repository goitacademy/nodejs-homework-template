import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameRegexp = /^([a-zA-Z]|\s)*$/;
const phoneRegexp = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

const contactShema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      required: [true, "missing required name field`"],
    },
    email: {
      type: String,
      match: [emailRegexp, "Please fill a valid email address"],
      required: [true, "missing required email field`"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return phoneRegexp.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "missing required phone field`"],
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

contactShema.post("save", handleSaveError);

contactShema.pre("findOneAndUpdate", preUpdate);

contactShema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().min(2).max(20).pattern(nameRegexp).required().messages({
    "string.base": '"Name" should be a type of "text"',
    "any.required": `missing required name field`,
    "string.pattern.base": '"Name" must contains only latters',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required name field`,
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "any.required": `missing required phone field`,
    "string.pattern.base": '"Phone" must be like (111) 111-1111',
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(20).pattern(nameRegexp).messages({
    "string.base": '"Name" should be a type of "text"',
    "string.pattern.base": '"Name" must contains only latters',
  }),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string().pattern(phoneRegexp).messages({
    "string.pattern.base": '"Phone" must be like (111) 111-1111',
  }),
  favorite: Joi.boolean(),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const Contact = model("contact", contactShema);

export default Contact;
