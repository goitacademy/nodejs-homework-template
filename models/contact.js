import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate } from "./hooks.js";

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: /.+\@.+\..+/,
    },
    phone: {
      type: String,
      match: /^((\+)?(3)?(8)?[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{2}[- ]?\d{2}$/,
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
  }, {versionKey: false, timestamps: true});

contactSchema.pre('findOneAndUpdate', validateAtUpdate);
contactSchema.post('save', handleSaveError);
contactSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model('contact', contactSchema);

export default Contact;