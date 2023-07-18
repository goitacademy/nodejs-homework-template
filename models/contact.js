const { Schema, model } = require("mongoose");
const mongooseError = require("../helpers/mongooseErrors")

const contactSchema = new Schema({
  name: {
    type: String,
    required: true
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  }
});

contactSchema.post("save", mongooseError);
const Contact = model("contact", contactSchema);

module.exports = Contact;
