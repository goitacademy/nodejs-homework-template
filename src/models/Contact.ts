import { ObjectId, Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveErr, handlePreUpdate } from "./hooks";

const phoneRegex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

export interface IContactSchema {
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
  avatar: string;
  owner: ObjectId;
}

export const contactSchema = new Schema<IContactSchema>(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      unique: true,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      min: [6, "Must be at least 6, got {VALUE}"],
      max: [12, "Too long phone number"],
      match: phoneRegex, //* formats (123) 456-7890
      unique: true,
      required: [true, "Phone is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true } //*налаштування схеми
);

contactSchema.pre("findOneAndUpdate", function name(next) {
  handlePreUpdate.call(this, next);
});

contactSchema.post("save", handleSaveErr); //* хук

contactSchema.post("findOneAndUpdate", handleSaveErr); //* Щоб при невдалому оновленні не прилітав 500 статус

export const contactAddSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(phoneRegex)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;

//!Mongoose Schema перевіряє те, що ми зберігаємо в базі
//? Joi перевіряє те, що прилітає з фронтенду
//*Mongoose перевіряє дані лише при додаванні, при оновленні НЕ ПЕРЕВІРЯЄ
