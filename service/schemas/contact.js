const { Schema, model } = require("mongoose");

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 70,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    phone: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contacts", contact);

module.exports = Contact;
