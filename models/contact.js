import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  title: String,
  director: String,
});

const Contact = model("contact", movieSchema);
export default Contact;
