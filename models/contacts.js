const mongoose = require("mongoose");
const contactSchema = require("../service/schemas/task");

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;

