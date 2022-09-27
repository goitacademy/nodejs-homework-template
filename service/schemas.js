const { Schema, model } = require("mongoose");

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      minlength: 2,
      maxlength: 20,
      unique: true,
      require: [true, "Email is required"],
    },
    phone: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Phone is required"],
      unique: true,
    },
    favorite: Boolean,
  },

  { versionKey: false, timestamps: true }
);

const Contact = model("contacts", contact);

module.exports = Contact;
