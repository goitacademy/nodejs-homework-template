import { model, Schema } from "mongoose";
import { handleSaveError, runValidatorsAtUpdate} from "./hooks.js";
import Joi from "joi";

const contactSchema = new Schema({
     name: {
      type: String,
      required: [true, 'missing required name field'],
    },
    email: {
        type: String,
        required: [true, 'missing required email field'],
    },
    phone: {
        type: String,
        required: [true, 'missing required phone field'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
})

contactSchema.post("save", handleSaveError)

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate)

contactSchema.post("findOneAndUpdate", handleSaveError)

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required" : `missing required name field`
  }),
  email: Joi.string().required().email().messages({
    "any.required" : `missing required email field`
  }),
  phone: Joi.string().required().messages({
    "any.required" : `missing required phone field`
  }),
  favorite: Joi.boolean(),
})

export const contactUpdateFavotiteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({"message": "missing field favorite"}),
})

const Contact = model("contact", contactSchema);

export default Contact;