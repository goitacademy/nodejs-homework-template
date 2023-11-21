import Joi from "joi";
import { Schema, model } from "mongoose";
import { hooks } from "../helpers/index.js";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: String,
    phone: String,
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

export const contactCheck = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const favoriteValid = Joi.object({
  favorite: Joi.boolean().required(),
});

contactsSchema.post("save", hooks.handelSaveError);
contactsSchema.pre("findOneAndUpdate", hooks.runValidators);
contactsSchema.post("findOneAndUpdate", hooks.handelSaveError);

const Contact = model("contact", contactsSchema);

export default Contact;
