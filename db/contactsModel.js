const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
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
  owner: {
    // type: SchemaTypes.ObjectId,
    // ref: 'user',
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("contacts", contactsSchema);

module.exports = {
  Contact,
};
