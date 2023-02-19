const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const ContactModel = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    validate: (value) => value.includes("@"),
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", ContactModel);

module.exports = { Contact };
