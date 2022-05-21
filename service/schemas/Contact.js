    const { Schema, model, SchemaTypes } = require("mongoose");

const contact = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    unique: true
  },
  email: {
    type: String,
    required: [true],
    unique: true
  },
  phone: {
    type: String,
    unique: true,
    required: [true],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  }
},{ versionKey: false });


const Contact = model("Contact", contact);

module.exports =  Contact;
