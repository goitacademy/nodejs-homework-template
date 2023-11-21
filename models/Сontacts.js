import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: /\([0-9]{3}\) [0-9]{3}-[0-9]{4}/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.post("save", handleMongooseError);

const Contact = model("contact", contactsSchema);

export default Contact;
