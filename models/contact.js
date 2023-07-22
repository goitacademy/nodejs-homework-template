const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { schemas } = require("../schemas");

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: [
        schemas.dataRegexp,
        "Invalid phone number format. Please fill a valid phone number (000) 000-0000.",
      ],
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactShema.post("save", handleMongooseError);

const Contact = model("contact", contactShema);

module.exports = { Contact };
