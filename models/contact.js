import {  Schema, model } from "mongoose";
import { handleMongooseError, runValidateAtUpdate } from "./hook.js";


const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    match: /^\\(\\d{3}\\) \\d{3}-\\d{4}$/,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {versionKey: false, timestamps: true})


contactSchema.post("save", handleMongooseError );
contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);

contactSchema.post("findOneAndUpdate", handleMongooseError);

const Contact = model("contact", contactSchema);

export default Contact;
