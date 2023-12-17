const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

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
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true,
    },
},{
    versionKey: false // You should be aware of the outcome after set to false
});

contactSchema.post("save", handleMongooseError);

// create model : 1st argument - collection name
const Contact = model('contact', contactSchema);

module.exports = Contact;