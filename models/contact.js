import {  Schema, model } from "mongoose";
import { handleMongooseError, runValidateAtUpdate } from "./hook.js";


const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
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

const Contact = model("contacts", contactSchema);

export default Contact;

