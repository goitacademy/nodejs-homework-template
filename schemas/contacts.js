const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    min: 1,
    max: 25,
    required: [true, "email is required"],
  },

  phone: {
    type: String,
    min: 12,
    max: 25,
    required: [true, "phone is required"],
  },

  favorite: {
    type: Boolean,
    required: [true, "favorite is required"],
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = mongoose.model("contact", contact);
module.exports = Contact;
