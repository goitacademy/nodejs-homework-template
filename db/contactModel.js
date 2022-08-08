const mongoose = require("mongoose");

const contactShema = new mongoose.Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  name: { type: String, required: [true, "Set name for contact"] },
  email: { type: String },
  phone: { type: String },
  favorite: { type: Boolean, default: false },
});

const Contact = mongoose.model("contacts", contactShema);

module.exports = {
  Contact,
};
