const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Try to name your contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Contact,
};
