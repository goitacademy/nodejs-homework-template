import { Shema, modal } from "mongoose";

const contactShema = new Shema({
    name: String,
    phone: String,
    email: String,
});

const Contact = model("contact", contactShema);

export default Contact;