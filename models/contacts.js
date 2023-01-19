const mongoose = require("mongoose");
const contactsSchema = require("../schemas/contactsSchema");

const Contacts = mongoose.model("contacts", contactsSchema);

module.exports = Contacts;
