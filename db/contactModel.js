const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    uniq: true,
  },
  email: { type: String, require: true },
  phone: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Contact,
};
