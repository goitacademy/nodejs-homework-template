import mongoose from "mongoose";
import Joi from "joi";

const contactSchema = new mongoose.Schema({
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
});

export const ContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" required field`,
  }),
  phone: Joi.number().required(),
  email: Joi.string().required(),
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
