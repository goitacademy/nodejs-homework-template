import { model, Schema } from "mongoose";

const contact = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
            minlength: 3,
            maxlength: 30,
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
    },
   
);

const Contact = model("contact", contact);

export default Contact;