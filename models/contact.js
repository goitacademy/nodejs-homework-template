import {Schema, model} from "mongoose";

const contactSchema = new Schema({
   name: String,
   title: String,
   email: String,
})

const Contact = model("contact", contactSchema);


export default Contact;