const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
      maxlength: [100, "Email cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
      unique: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    favorite: {
      type: Boolean,
      default: false,
      required: [true, "Set is favorite for a contact"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { collection: "contacts", versionKey: false }
);

module.exports = mongoose.model("Contact", contactSchema);
