import {Schema, model} from "mongoose";
import {handleSaveError, setUpdateSettings} from "./hooks.js";
import Joi from "joi";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {versionKey: false}
);

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", setUpdateSettings);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddShema = Joi.object({
  name: Joi.string()
    .required()
    .messages({"any.required": "missing required 'name' field"}),
  email: Joi.string()
    .required()
    .messages({"any.required": "missing required 'email' field"}),
  phone: Joi.string()
    .required()
    .messages({"any.required": "missing required 'phone' field"}),
  favorite: Joi.boolean(),
});

export const contactUpdateShema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactUpdateFavoriteShema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({"any.required": "missing field favorite"}),
});

const Contact = model("contact", contactSchema);

export default Contact;
