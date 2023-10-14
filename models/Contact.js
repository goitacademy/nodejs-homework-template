import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";
const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;
const contactSchema = new Schema({
    name: {
      type: String,
      match: nameRegexp,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
},
{versionKey: false});
contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);
export const contactsAddSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(nameRegexp)
    .required()
    .messages({
      'any.required': 'missing required \'name\' field',
      'string.pattern.base':
        'Name may contain only letters, apostrophe, dash, and spaces. For example, Adrian, Jacob Mercer, Charles de Batz de Castelmore d\Artagnan',
    }),
  email: Joi.string().email().required().messages({
    'any.required': 'missing required \'email\' field',
  }),
  phone: Joi.string()
    .pattern(new RegExp(phoneRegexp))
    .required()
    .messages({
      'any.required': 'missing required \'phone\' field',
      'string.pattern.base':
        'Phone number must be must be in the format (XXX) XXX-XXXX',
    }),
  favorite: Joi.boolean()
});
export const contactUpdateFavoriteSchema = Joi.object({
     favorite: Joi.boolean().required().messages({ 'any.required': 'Missing field favorite' }),
})
const Contact = model('contact', contactSchema);
export default Contact;






