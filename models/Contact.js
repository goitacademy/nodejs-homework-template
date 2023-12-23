import { Schema, model } from "mongoose";


const contactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    favorite: Boolean,
});

const Contact = model('contact', contactSchema);

export default Contact;