const mongoose = require("mongoose");

// Mongoose Schema
const schemaContacts = new mongoose.Schema ({
 name: {
    type: String,
    required: [true, 'Set name for contact']
 },
 email: {
    type: String,
 },
 phone: {
    type: String,
 },
 favorite: {
    type: Boolean,
    default: false,
 },
 owner: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "user",
 },
}, {versionKey: false, timestamps: true})

module.exports = mongoose.model('Contact', schemaContacts);