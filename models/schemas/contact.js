const { Schema } = require("mongoose");

const contactShema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "should consist of more than two characters"],
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
  },
  { versionKey: false, timestamps: true }
);

module.exports = contactShema;
