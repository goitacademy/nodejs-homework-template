const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },

  // owner: {
  // type: SchemaTypes.ObjectId,
  //  ref: 'user',
  //   },
});

const Contact = mongoose.model("db-contacts", ContactSchema);

module.exports = Contact;
