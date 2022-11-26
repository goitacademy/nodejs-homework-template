const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const contact = new Schema( {
    name: {
      type:  String,
       index: 1 ,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  });
  const Contact = mongoose.model('contact', contact)

module.exports = Contact