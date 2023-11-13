const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  // name: String,
  // email: String,
  // phone: Number,

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: 2000,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  // default: "name",
}, {
  versionKey: false,
  timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);


