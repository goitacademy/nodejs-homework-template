const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    match: /^\(\d{3}\) \d{3}-\d{4}$/,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
