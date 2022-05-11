    const { Schema, model } = require("mongoose");

const contact = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true],
  },
  phone: {
    type: String,
    required: [true],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
 
},{ versionKey: false });


const Contact = model("Contact", contact);

module.exports =  Contact;
