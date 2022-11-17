const mongoose = require("mongoose");

const contactShema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  favorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const Contacts = mongoose.model("contacts", contactShema);
module.exports = { Contacts };
