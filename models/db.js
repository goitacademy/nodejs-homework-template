import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  title: String,
  director: String,
});
const Contact = model("contact", contactSchema);

export default Contact;
