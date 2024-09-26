import { Schema, model } from "mongoose";

import {handleSaveError, validateAtUpdate} from './hooks.js'

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
      match: /^(\+\d{1,3})?[-()\d\s]+$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    }, 
}, {versionKey:false, timestamps:true})

contactSchema.pre("findOneAndUpdate", validateAtUpdate)

contactSchema.post("save", handleSaveError)
contactSchema.post("findOneAndUpdate", handleSaveError)


const Contact = model("Contact", contactSchema);

export default Contact;