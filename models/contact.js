import { Schema, model } from "mongoose";

const contactsSchema = new Schema({
  name: {
    type: String,
    require: [true, "Set name for contact"],
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

const Contact = model("contact", contactsSchema);

export default Contact;
