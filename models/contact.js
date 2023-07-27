import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

const Contact = model("contact", movieSchema);
export default Contact;
