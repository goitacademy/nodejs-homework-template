import { model, Schema } from "mongoose";
import { handleSaveError, runValidatorsAtUpdate} from "./hooks.js";
import Joi from "joi";



const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

const contactSchema = new Schema({
     name: {
      type: String,
      required: [true, 'missing required name field'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'missing required email field'],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, 'missing required phone field'],
    },
    favorite: {
      type: Boolean,
      default: false,
  },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
}, { versionKey: false, timestamps: true})

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
  phone: Joi.string().required().pattern(phoneRegexp).messages({
    "any.required" : `missing required phone field`
  }),
  favorite: Joi.boolean(),
})

export const contactUpdateFavotiteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({"message": "missing field favorite"}),
})

const Contact = model("contact", contactSchema);

export default Contact;