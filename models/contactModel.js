const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    favorite: { type: Boolean, default: false },
  },
  { collection: "contacts" }
);

module.exports = mongoose.model("Contact", contactSchema);
