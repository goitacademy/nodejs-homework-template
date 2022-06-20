const mongoose = require("mongoose");

const contaatsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Set name for contact"],
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
const Contacts = mongoose.model("contacts", contaatsSchema);

module.exports = {
  Contacts,
};
