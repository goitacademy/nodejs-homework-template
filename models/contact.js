const { Schema, model } = require("mongoose");

// crete object schema (keyword 'new' for ES6): 1st argument - object decription
// 2nd - 
const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        required: false,
    }
},{
    versionKey: false // You should be aware of the outcome after set to false
});

// create model : 1st argument - collection name
const Contact = model('contact', contactSchema);

module.exports = Contact;