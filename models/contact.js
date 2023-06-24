const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      min: [3, "Too short name"],
      required: [true, "name is required"],
    },
    email: {
      type: String,
      match: [
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please fill a valid email address",
      ],
      required: [true, "email is required"],
    },
    phone: {
      type: String,
      match: /^[+]?[0-9 ()-]*$/,
      required: [true, "phone number is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
    
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
