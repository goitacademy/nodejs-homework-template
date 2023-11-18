const { Schema, model } = require('mongoose');



const ContactSchema= new Schema({
    name: String,
    email: String,
    phone: String,
});


const Contact=model('contact', ContactSchema);

module.exports = {
    Contact,
  };