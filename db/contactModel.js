const mongoose = require("mongoose");

const contactShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Contact = mongoose.model("contact", contactShema);

module.exports = {
  Contact,
};
