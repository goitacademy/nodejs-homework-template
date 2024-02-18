const mongoose = require("mongoose");
const { Schema } = mongoose;

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      minLength: 8,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      minLength: 5,
      required: [true, "Set phone number for contact"],
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
