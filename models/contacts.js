import Joi from "joi";
import { Schema, model } from "mongoose";
import { hooks } from "../helpers/index.js";

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
    },
    phone: String,
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
  { versionKey: false }
);

export const contactCheck = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegexp),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const favoriteValid = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

contactsSchema.post("save", hooks.handelSaveError);
contactsSchema.pre("findOneAndUpdate", hooks.runValidators);
contactsSchema.post("findOneAndUpdate", hooks.handelSaveError);

const Contact = model("contact", contactsSchema);

export default Contact;