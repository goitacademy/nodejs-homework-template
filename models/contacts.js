import { Schema, model } from "mongoose";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
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
contactsSchema.post("save", handleSaveError);
contactsSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactsSchema.post("findOneAndUpdate", handleSaveError);

const Contacts = model("contact", contactsSchema);

export default Contacts;