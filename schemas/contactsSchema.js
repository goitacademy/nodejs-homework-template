import { Schema, model } from "mongoose";

const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        unique: [true, "Use another email address"],

    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
})

export const ContactModel = model('contact', contactsSchema);

