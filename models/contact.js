const { model } = require("mongoose");
const { contactSchema } = require("../schemas/contacts");

const Contact = model("contact", contactSchema);

module.exports = Contact;
