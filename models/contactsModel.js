const { model, Schema } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    // required: true,
    unique: [true, "Duplicated email.."],
  },
  phone: {
    type: String,
    // required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
const ContactModel = model("contact", contactSchema);

module.exports = ContactModel;
