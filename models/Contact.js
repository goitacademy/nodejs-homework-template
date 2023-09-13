import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";
import { runValidateAtUpdate } from "./hooks.js";


// const releaseYearRegexp = /^\d{4}$/; 


const contactSchema = new Schema(
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
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  //   releaseYear: {
  //     type: String,
  //     match: releaseYearRegexp,
  //     required: true,
  // }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
