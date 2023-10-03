import { Schema, model } from "mongoose";

import { handlSaveError, runValidateAtUpdate } from "./hooks.js";

const contactSchema = new Schema({
    name: {
        type: String,
        require: [true, "missing required 'name' field"],
    },
   
    email: {
        type: String,
        require: [true, "missing required 'email' field"],
    },
    phone: {
        type: String,
        require: [true, "missing required 'phone' field"],
    },
    favorite: {
        type: Boolean,
        default: false,
    }
}, {versionKey: false, timestamps:true});

contactSchema.post("save", handlSaveError)

 contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);

 contactSchema.post("findOneAndUpdate", handlSaveError);

const Contact = model("contact", contactSchema);

export default Contact;