import mongoose from "mongoose";
import Joi from "joi";



const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
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
});

const Contact = mongoose.model('contacts', contactSchema )

export const ContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" required field`,
  }),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  
});





export default Contact;

