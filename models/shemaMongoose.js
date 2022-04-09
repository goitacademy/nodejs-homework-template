const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { regexName, regexEmail, regexPhone } = require('../helpers/regax');

const validateName = name => regexName.test(name);
const validateEmail = email => regexEmail.test(email);
const validatePhone = phone => regexPhone.test(phone);

const contactMongooseSchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 50,
        required: [true, 'Name field is required'],
        validate: [validateName, 'Please fill a valid name'],
        match: [regexName, 'Please fill a valid name'],
    },
    email: {
        type: String,
        index: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 100,
        required: [true, 'Email field is required'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [regexEmail, 'Please fill a valid email address'],
        unique: true,
    },
    phone: {
        type: String,
        minlength: 7,
        maxlength: 30,
        required: [true, 'Phone field is required'],
        validate: [validatePhone, 'Please fill a valid phone number'],
        match: [regexPhone, 'Please fill a valid phone number'],
    },
    favorite: {
        type: Boolean,
        required: [false, "Favorite field isn't required"],
        default: false,
    },
}, { versionKey: false, timestamps: true }, );

const Contact = mongoose.model('contact', contactMongooseSchema);

module.exports = Contact;