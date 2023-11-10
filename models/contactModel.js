const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [3, "too few symbols"],
    max: 30,
    required: [true, "User name required"],
  },
  email: {
    type: String,
    required: [true, "User name required"],
  },
  phone: {
    type: String,
    required: [true, "User name required"],
  },
});

module.exports = mongoose.model("Contact", contactSchema);
