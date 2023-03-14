const mongoose = require("mongoose"); // импортируем Mongoose

const contactsSchema = new mongoose.Schema({  // проверяем, что правильно создана схема
 name: {
   type: String,
   required: [true, "Set name for contact"],
   unique: true,
 },
 email: {
   type: String,
   required: true,
   unique: true,
 },
 phone: {
   type: String,
   required: true,
   unique: true,
 },
 favorite: {
   type: Boolean,
   default: false,
 },
 owner: {
   type: mongoose.SchemaTypes.ObjectId,
   ref: 'user',
 }
});

const Contacts = mongoose.model("contacts", contactsSchema);

module.exports = Contacts;
