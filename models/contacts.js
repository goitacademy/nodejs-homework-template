const mongoose = require("mongoose");
const contactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Contact", contactsSchema);
