const { model } = require("mongoose");

const { contact } = require("./schemas");
const { contactSchema } = contact;

const Contact = model("contact", contactSchema);

module.exports = Contact;
