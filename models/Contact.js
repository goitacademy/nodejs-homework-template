import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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

// const contactSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     unique: true,
//     validate: [validateEmail, "Please fill a valid email address"],
//     match: [
//       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//       "Please fill a valid email address",
//     ],
//   },
//   phone: {
//     type: String,
//     required: true,
//     match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
//   },
//   favorite: {
//     type: Boolean,
//     default: false,
//   },
// });

const Contact = model("contact", contactSchema);

export default Contact;
