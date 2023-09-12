const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [40, "Name can be up to 40 characters long"],
  },
  email: {
    type: String,
    validate: {
      validator: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Invalid email format",
    },
  },
  phone: {
    type: String,
    validate: {
      validator: function (phone) {
        return /^[0-9]+$/.test(phone);
      },
      message: "Phone must contain only digits",
    },
    minlength: [3, "Phone number must be at least 3 digits long"],
    maxlength: [25, "Phone number must be shorter that 25 digits long"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
