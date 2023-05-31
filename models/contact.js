const  {model, Schema} =require('mongoose');

const contactSchema = Schema({
     name:  String,
     email: String,
     phone: String,
     favorite: Boolean,    
    }
)
const Contact = model('contact', contactSchema);

module.exports = Contact;