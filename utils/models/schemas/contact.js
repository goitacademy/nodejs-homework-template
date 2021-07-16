const { Schema } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = contactSchema;
