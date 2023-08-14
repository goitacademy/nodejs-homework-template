import { Schema, model } from "mongoose";
import {handleSaveError, validateAndUpdate} from "./hooks.js";

const contactSchema = new Schema ({
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
}, {versionKey: false, timeseries: true});

contactSchema.pre("findOneAndUpdate", validateAndUpdate)

contactSchema.post("save", handleSaveError)
contactSchema.post("findOneAndUpdate", handleSaveError)

const Contact = model("contact", contactSchema);

export default Contact;