import { Schema, model } from "mongoose";

const contactsSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    favorite: Boolean,
  },
  { versionKey: false, timestamp: true }
);

const Contact = model("contact", contactsSchema);

export default Contact;
