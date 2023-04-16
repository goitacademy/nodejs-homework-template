const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 15,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    min: 8,
    max: 30,
    match: /^\(\d{3}\)\d{2}-\d{2}-\d{3}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true, 
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
},
{ versionKey: false }
);

const Contact = model("contact", contactSchema);  // модель що працює з колекцією
module.exports= Contact;