const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  });

  const Contacts = mongoose.model("contacts", contactSchema);

  module.exports = Contacts;