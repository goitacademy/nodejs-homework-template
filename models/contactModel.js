const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

const contactScheme = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      match: [emailRegex, "Invalid email format"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
      match: [phoneRegex, "Invalid phone number format"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactScheme.post("save", mongooseError);

const Contact = model("contact", contactScheme);

module.exports = Contact;
