import mongoose from "mongoose";
import Joi from "joi";



const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    
  }
});



export const ContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" required field`,
  }),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const Contact = mongoose.model('contacts', contactSchema )






export default Contact;

