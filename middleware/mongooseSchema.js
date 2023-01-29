const  {Schema, model} = require("mongoose");


const contactsSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],

    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

const Contact = model('contact', contactsSchema);


module.exports = {Contact};
   
