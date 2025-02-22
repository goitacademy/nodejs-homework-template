const mongoose = require("mongoose");
const gravatar = require("gravatar");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    favorite: { type: Boolean, default: false },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250", d: "retro" }, true);
      },
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
